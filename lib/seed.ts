import { readFileSync } from "fs";
import { resolve } from "path";
import { neon } from "@neondatabase/serverless";

// Load .env.local manually (tsx doesn't load it automatically)
const envPath = resolve(process.cwd(), ".env.local");
try {
  const envContent = readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
} catch {
  console.error("Could not read .env.local");
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Check .env.local");
}

const sql = neon(DATABASE_URL);

async function seed() {
  console.log("🌱 Starting seed...\n");

  // 1. Create tables
  console.log("📋 Creating tables...");
  await sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      image_profile TEXT,
      top_tagline VARCHAR(255),
      bottom_tagline VARCHAR(255),
      description TEXT,
      carousel JSONB DEFAULT '[]',
      biodata TEXT,
      vision TEXT,
      mission TEXT,
      education JSONB DEFAULT '[]',
      organization JSONB DEFAULT '[]',
      experience JSONB DEFAULT '[]',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      category VARCHAR(20) NOT NULL CHECK (category IN ('news', 'achievement')),
      published_date DATE,
      image TEXT,
      description TEXT,
      tags JSONB DEFAULT '[]',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      position VARCHAR(255),
      profile_image TEXT,
      review TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      aspiration TEXT NOT NULL,
      phone_number VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  console.log(" Tables created\n");

  // 2. Seed Profile
  console.log(" Seeding profile...");
  const existingProfile = await sql`SELECT id FROM profiles LIMIT 1`;
  if (existingProfile.length === 0) {
    await sql`
      INSERT INTO profiles (
        name, position, image_profile, top_tagline, bottom_tagline,
        description, carousel, biodata, vision, mission,
        education, organization, experience
      ) VALUES (
        'Hj. Mimik Idayana',
        'Calon Bupati Sidoarjo',
        'https://res.cloudinary.com/dtvrohnez/image/upload/v1775498141/2_removebg_preview_fed9e853df.png',
        'Bersama Membangun',
        'Sidoarjo Lebih Baik',
        'Berkomitmen untuk memajukan Sidoarjo melalui program-program inovatif yang berfokus pada kesejahteraan rakyat.',
        ${JSON.stringify([
          {
            imageCarousel:
              "https://res.cloudinary.com/dtvrohnez/image/upload/v1775498141/2_removebg_preview_fed9e853df.png",
          },
          {
            imageCarousel:
              "https://res.cloudinary.com/dtvrohnez/image/upload/v1775498141/1.png",
          },
          {
            imageCarousel:
              "https://res.cloudinary.com/dtvrohnez/image/upload/v1775498141/3.png",
          },
          {
            imageCarousel:
              "https://res.cloudinary.com/dtvrohnez/image/upload/v1775498141/4.png",
          },
        ])},
        'Hj. Mimik Idayana adalah seorang pemimpin yang berdedikasi untuk kemajuan Sidoarjo.',
        'Mewujudkan Sidoarjo sebagai kabupaten yang maju, sejahtera, dan berkeadilan.',
        '- Meningkatkan kualitas pendidikan\n- Memperkuat ekonomi kerakyatan\n- Membangun infrastruktur yang merata\n- Meningkatkan pelayanan kesehatan',
        ${JSON.stringify([
          {
            school: "Universitas Airlangga",
            location: "Surabaya",
            startYear: 1990,
            endYear: 1994,
          },
        ])},
        ${JSON.stringify([
          {
            organization: "DPRD Sidoarjo",
            startYear: 2019,
            endYear: "Sekarang",
            image: null,
          },
        ])},
        ${JSON.stringify([
          {
            experience: "Anggota DPRD Sidoarjo",
            startYear: 2019,
            endYear: "Sekarang",
            image: null,
          },
          {
            experience: "Ketua Komisi IV",
            startYear: 2020,
            endYear: 2024,
            image: null,
          },
        ])}
      )
    `;
    console.log("✅ Profile seeded");
  } else {
    console.log("âï¸ Profile already exists, updating carousel...");
    await sql`
      UPDATE profiles SET 
        carousel = ${JSON.stringify([
          {
            imageCarousel:
              "https://res.cloudinary.com/dtvrohnez/image/upload/v1775498141/2_removebg_preview_fed9e853df.png",
          },
          {
            imageCarousel:
              "https://res.cloudinary.com/dtvrohnez/image/upload/v1775498141/1.png",
          },
          {
            imageCarousel:
              "https://res.cloudinary.com/dtvrohnez/image/upload/v1775498141/3.png",
          },
          {
            imageCarousel:
              "https://res.cloudinary.com/dtvrohnez/image/upload/v1775498141/4.png",
          },
        ])}
      WHERE id = (SELECT id FROM profiles LIMIT 1)
    `;
    console.log("âï¸ Profile carousel updated");
  }

  // 3. Seed Articles
  console.log("\n📰 Seeding articles...");
  const existingArticles = await sql`SELECT id FROM articles LIMIT 1`;
  if (existingArticles.length === 0) {
    await sql`
      INSERT INTO articles (title, slug, category, published_date, image, description, tags)
      VALUES
        ('Kunjungan ke Desa Wisata Sidoarjo', 'kunjungan-ke-desa-wisata-sidoarjo', 'news', '2024-01-15', '/1.png', 'Kunjungan langsung ke desa wisata untuk melihat potensi pariwisata lokal Sidoarjo.', ${JSON.stringify([{ tag: "Pariwisata" }, { tag: "Sidoarjo" }])}),
        ('Penghargaan Tokoh Inspiratif 2024', 'penghargaan-tokoh-inspiratif-2024', 'achievement', '2024-02-20', '/2.png', 'Meraih penghargaan sebagai tokoh inspiratif dalam bidang pemberdayaan masyarakat.', ${JSON.stringify([{ tag: "Penghargaan" }])}),
        ('Program Beasiswa untuk Anak Sidoarjo', 'program-beasiswa-untuk-anak-sidoarjo', 'news', '2024-03-10', '/1.png', 'Meluncurkan program beasiswa untuk mendukung pendidikan anak-anak berprestasi di Sidoarjo.', ${JSON.stringify([{ tag: "Pendidikan" }, { tag: "Beasiswa" }])})
    `;
    console.log("✅ Articles seeded");
  } else {
    console.log("⏭️  Articles already exist, skipping");
  }

  // 4. Seed Testimonials
  console.log("\n💬 Seeding testimonials...");
  const existingTestimonials = await sql`SELECT id FROM testimonials LIMIT 1`;
  if (existingTestimonials.length === 0) {
    await sql`
      INSERT INTO testimonials (name, position, profile_image, review)
      VALUES
        ('Ahmad Fauzi', 'Tokoh Masyarakat', null, 'Sosok pemimpin yang dekat dengan rakyat dan selalu mendengarkan aspirasi masyarakat.'),
        ('Siti Rahayu', 'Guru SD', null, 'Program pendidikannya sangat membantu anak-anak di daerah kami.'),
        ('Budi Santoso', 'Pengusaha UMKM', null, 'Berkat dukungannya, UMKM di Sidoarjo semakin berkembang dan berdaya saing.')
    `;
    console.log("✅ Testimonials seeded");
  } else {
    console.log("⏭️  Testimonials already exist, skipping");
  }

  console.log("\n🎉 Seed completed!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
