import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const sql = neon(process.env.DATABASE_URL);

// Profile functions

// Returns a single profile (first row), mapped to camelCase to match frontend types
export async function getProfile() {
  const result = await sql`
    SELECT * FROM profiles 
    ORDER BY created_at DESC
    LIMIT 1
  `;

  const row = result[0];
  if (!row) return null;

  return {
    name: row.name,
    position: row.position,
    imageProfile: row.image_profile,
    topTagline: row.top_tagline,
    bottomTagline: row.bottom_tagline,
    description: row.description,
    carousel: row.carousel ?? [],
    biodata: row.biodata,
    vision: row.vision,
    mission: row.mission,
    education: row.education ?? [],
    organization: row.organization ?? [],
    experience: row.experience ?? [],
  };
}

export async function createProfile(data: {
  name: string;
  position: string;
  imageProfile?: string;
  topTagline?: string;
  bottomTagline?: string;
  description?: string;
  carousel?: { imageCarousel: string }[];
  biodata?: string;
  vision?: string;
  mission?: string;
  education?: {
    school: string;
    location: string;
    startYear: number;
    endYear: number | string;
  }[];
  organization?: {
    organization: string;
    startYear: number;
    endYear: number | string;
    image?: string | null;
  }[];
  experience?: {
    experience: string;
    startYear: number;
    endYear: number | string;
    image?: string | null;
  }[];
}) {
  const result = await sql`
    INSERT INTO profiles (
      name, position, image_profile, top_tagline, bottom_tagline,
      description, carousel, biodata, vision, mission,
      education, organization, experience
    )
    VALUES (
      ${data.name}, ${data.position}, ${data.imageProfile ?? null},
      ${data.topTagline ?? null}, ${data.bottomTagline ?? null},
      ${data.description ?? null}, ${JSON.stringify(data.carousel ?? [])},
      ${data.biodata ?? null}, ${data.vision ?? null}, ${data.mission ?? null},
      ${JSON.stringify(data.education ?? [])},
      ${JSON.stringify(data.organization ?? [])},
      ${JSON.stringify(data.experience ?? [])}
    )
    RETURNING *
  `;
  return result[0];
}

export async function updateProfile(
  id: number,
  data: Partial<Parameters<typeof createProfile>[0]>,
) {
  const result = await sql`
    UPDATE profiles SET
      name = COALESCE(${data.name ?? null}, name),
      position = COALESCE(${data.position ?? null}, position),
      image_profile = COALESCE(${data.imageProfile ?? null}, image_profile),
      top_tagline = COALESCE(${data.topTagline ?? null}, top_tagline),
      bottom_tagline = COALESCE(${data.bottomTagline ?? null}, bottom_tagline),
      description = COALESCE(${data.description ?? null}, description),
      carousel = COALESCE(${data.carousel ? JSON.stringify(data.carousel) : null}, carousel),
      biodata = COALESCE(${data.biodata ?? null}, biodata),
      vision = COALESCE(${data.vision ?? null}, vision),
      mission = COALESCE(${data.mission ?? null}, mission),
      education = COALESCE(${data.education ? JSON.stringify(data.education) : null}, education),
      organization = COALESCE(${data.organization ? JSON.stringify(data.organization) : null}, organization),
      experience = COALESCE(${data.experience ? JSON.stringify(data.experience) : null}, experience)
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0];
}

export async function deleteProfile(id: number) {
  await sql`DELETE FROM profiles WHERE id = ${id}`;
}

// Article functions

function mapArticleRow(row: Record<string, unknown>) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    publishedDate: row.published_date,
    image: row.image,
    description: row.description,
    tags: (row.tags as { tag: string }[]) ?? [],
  };
}

export async function getArticles(category?: string) {
  let result;
  if (category) {
    result = await sql`
      SELECT * FROM articles 
      WHERE category = ${category}
      ORDER BY published_date DESC
    `;
  } else {
    result = await sql`
      SELECT * FROM articles 
      ORDER BY published_date DESC
    `;
  }

  return result.map(mapArticleRow);
}

export async function getArticleBySlug(slug: string) {
  const result = await sql`
    SELECT * FROM articles 
    WHERE slug = ${slug}
    LIMIT 1
  `;

  const row = result[0];
  if (!row) return null;
  return mapArticleRow(row);
}

export async function getArticleById(id: number) {
  const result = await sql`
    SELECT * FROM articles 
    WHERE id = ${id}
    LIMIT 1
  `;

  const row = result[0];
  if (!row) return null;
  return mapArticleRow(row);
}

export async function createArticle(data: {
  title: string;
  slug?: string;
  category: "news" | "achievement";
  publishedDate?: string;
  image?: string;
  description?: string;
  tags?: { tag: string }[];
}) {
  const slug =
    data.slug ||
    data.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  const result = await sql`
    INSERT INTO articles (title, slug, category, published_date, image, description, tags)
    VALUES (
      ${data.title}, ${slug}, ${data.category},
      ${data.publishedDate ?? null}, ${data.image ?? null},
      ${data.description ?? null}, ${JSON.stringify(data.tags ?? [])}
    )
    RETURNING *
  `;
  return result[0];
}

// Testimonial functions
export async function getTestimonials() {
  const result = await sql`
    SELECT * FROM testimonials 
    ORDER BY created_at DESC
  `;

  return result.map((row) => ({
    id: row.id,
    name: row.name,
    position: row.position,
    profileImage: row.profile_image,
    review: row.review,
  }));
}

export async function createTestimonial(data: {
  name: string;
  position?: string;
  profileImage?: string;
  review: string;
}) {
  const result = await sql`
    INSERT INTO testimonials (name, position, profile_image, review)
    VALUES (${data.name}, ${data.position ?? null}, ${data.profileImage ?? null}, ${data.review})
    RETURNING *
  `;
  return result[0];
}

// Comment functions
export async function getComments() {
  const result = await sql`
    SELECT * FROM comments 
    ORDER BY created_at DESC
  `;
  return result;
}

export async function createComment(data: {
  name: string;
  email: string;
  aspiration: string;
  phoneNumber: string;
}) {
  const result = await sql`
    INSERT INTO comments (name, email, aspiration, phone_number)
    VALUES (${data.name}, ${data.email}, ${data.aspiration}, ${data.phoneNumber})
    RETURNING *
  `;
  return result[0];
}
