import AppNavbar from "../components/app-navbar";
import TestimoniCard from "../components/testimoni/testimoni-card";
import { getTestimonials } from "@/lib/database";
import { Testimoni } from "../types/testimoni";

export const dynamic = "force-dynamic";

const TILT_CLASSES = [
  "hover:-rotate-3 hover:-translate-y-1",
  "hover:rotate-2 hover:-translate-y-2",
  "hover:-rotate-2 hover:-translate-y-1",
  "hover:rotate-3 hover:-translate-y-1",
  "hover:-rotate-1 hover:-translate-y-2",
  "hover:rotate-2 hover:-translate-y-1",
];

export default async function TestimoniPage() {
  const data = await getTestimonials();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-linear-to-br from-red-50 via-white to-amber-50 pb-20">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-red-200/40 blur-3xl" />
        <div className="absolute top-40 -right-16 h-80 w-80 rounded-full bg-yellow-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-100/50 blur-3xl" />
      </div>

      <AppNavbar />

      <div className="relative z-10 px-6 pt-40 md:pt-44 pb-16 max-w-7xl mx-auto">
        <div className="mx-auto mb-10 w-fit rounded-full border border-red-100 bg-white/75 px-4 py-2 text-sm font-medium text-red-800 shadow-sm backdrop-blur">
          Testimoni Klien & Rekan
        </div>

        <div className="text-center pb-12">
          <h2 className="text-4xl md:text-5xl leading-normal font-extrabold tracking-tight bg-linear-to-r from-red-700 to-yellow-500 bg-clip-text text-transparent mb-4">
            Komentar Mereka Tentang Saya
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Apa kata mereka tentang pengalaman bekerja sama dengan saya
          </p>
        </div>

        <section className="rounded-3xl border border-white/60 bg-white/55 p-4 md:p-6 shadow-xl shadow-red-100/60 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-4">
            {(data as Testimoni[]).map((testimoni, index) => (
              <TestimoniCard
                key={testimoni.id}
                testimoni={testimoni}
                tiltClass={TILT_CLASSES[index % TILT_CLASSES.length]}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
