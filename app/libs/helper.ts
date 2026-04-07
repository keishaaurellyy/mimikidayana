export async function fetchApi(path: string, options = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ""}`,
    },
    ...options,
  });

  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}

// Commented mock data for reference
// export async function fetchApi(path: string, options = {}) {
//   if (path.includes("/artikel") && !path.match(/\/artikel\/\d+/)) {
//     return {
//       data: [
//         {
//           id: 1,
//           category: "prestasi",
//           title: "Juara 1 Lomba Debat Nasional",
//           description:
//             "Tim debat kami berhasil meraih juara 1 dalam kompetisi debat tingkat nasional.",
//           image: { url: "/1.png" },
//         },
//         {
//           id: 2,
//           category: "prestasi",
//           title: "Best Innovation Award 2024",
//           description:
//             "Inovasi teknologi kami mendapatkan penghargaan tertinggi di ajang internasional.",
//           image: { url: "/2.png" },
//         },
//         {
//           id: 3,
//           category: "news",
//           title: "Program Beasiswa 2024 Dibuka",
//           description:
//             "Kami dengan bangga mengumumkan pembukaan program beasiswa tahun 2024 untuk siswa berprestasi.",
//           image: { url: "/1.png" },
//         },
//         {
//           id: 4,
//           category: "news",
//           title: "Kerjasama dengan Industri Teknologi",
//           description:
//             "Menjalin kerjasama strategis dengan perusahaan teknologi terkemuka untuk pengembangan skill mahasiswa.",
//           image: { url: "/2.png" },
//         },
//         {
//           id: 5,
//           category: "news",
//           title: "Workshop Digital Marketing 2024",
//           description:
//             "Workshop intensif tentang strategi digital marketing yang akan diadakan bulan depan.",
//           image: { url: "/1.png" },
//         },
//         {
//           id: 6,
//           category: "news",
//           title: "Workshop Digital Marketing 2024",
//           description:
//             "Workshop intensif tentang strategi digital marketing yang akan diadakan bulan depan.",
//           image: { url: "/4.png" },
//         },
//         {
//           id: 7,
//           category: "news",
//           title: "Workshop Digital Marketing 2024",
//           description:
//             "Workshop intensif tentang strategi digital marketing yang akan diadakan bulan depan.",
//           image: { url: "/3.png" },
//         },
//       ],
//     } as any;
//   }

//   // Mock detail artikel
//   if (path.match(/\/artikel\/\d+/)) {
//     return {
//       data: {
//         title: "Indonesia Darurat Krisis Iklim",
//         slug: "indonesia-darurat-krisis-iklim",
//         category: "news",
//         publishedDate: "2026-02-11",
//         image: "http://localhost:1337/uploads/DSC_00597_2e90f7eb23.JPG",
//         description:
//           "Sore menjelang magrib, tak terlihat anak-anak berlari gembira bermain sepak bola di desa pesisir itu. Wajah para orangtua pun murung bersamaan dengan matahari tenggelam. Selama bertahun-tahun, desa itu dipenuhi kekhawatiran yang berulang; rumah mereka tergenang banjir rob.\n\nWarga pesisir Demak, Jawa Tengah, setiap hari terpaksa berjibaku menghadapi abrasi laut. Efek turunannya pun tak main-main. Mulai terpaksa membeli air bersih dengan harga tinggi sampai pada titik keputusasaan menjual tanah dengan harga yang sangat rendah. Layaknya air laut yang menggenangi rumah mereka setiap sore, harapan-harapan mereka kerap tenggelam dalam ketidakpastian.\n\nKami bersyukur bisa bertemu langsung dan mendengar harapan warga pesisir Demak saat melakukan tirakat. Perjalanan tirakat itu untuk mendengar, menyerap, dan merasakan kondisi terkini yang ada di masyarakat. Ada beragam masalah yang dirasakan warga. Tak hanya pesisir Demak, pulau-pulau kecil sepanjang wilayah Kepulauan Riau, Miangas, sampai selatan Borneo nyaris tenggelam.\n\nTercatat lebih dari 80 pulau terdepan terancam tenggelam karena kecepatan kenaikan air laut. Ini bukan sekadar fenomena alam, ini mengancam kedaulatan negara karena konsep kedaulatan kita diukur dari pulau-pulau terdepan yang berbatasan dengan negara lain.\n\nSecara hitungan matematis, jumlah warga di pulau terdepan tak sebanyak di pulau-pulau besar. Namun, Republik ini didirikan bukan hanya untuk tempat-tempat yang padat penduduk. Republik ini didirikan untuk siapa saja yang ada di ibu pertiwi. Jadi, jangan menganggap lumrah kesulitan warga pesisir, pembiaran semacam ini harus dihentikan. Akar masalahnya jelas nyata dan menjadi salah satu tantangan terbesar saat ini; krisis iklim.",
//         tags: [
//           {
//             tag: "Keadilan Sosial",
//           },
//           {
//             tag: "Krisis Iklim",
//           },
//         ],
//       },
//     } as any;
//   }

//   if (path.includes("/profiles")) {
//     return { data: [] };
//   }

//   if (path.includes("/testimonials")) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api${path}`, {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN || ""}`
//       },
//       ...options,
//     });

//     if (!res.ok) throw new Error(`Error: ${res.status}`);
//     return res.json();
//   }

//   if (path.includes("/comments")) {
//     return {
//       data: {
//         id: Date.now(),
//         ...(options.body ? JSON.parse(options.body as string) : {}),
//         created_at: new Date().toISOString(),
//       },
//     };
//   }

//   return { data: [] };
// }

export function normalizeUrl(url: string) {
  return url?.replace(/([^:])\/\//g, "$1/");
}
