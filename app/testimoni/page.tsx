import AppNavbar from "../components/app-navbar";
import TestimoniCard from "../components/testimoni/testimoni-card";
import { getTestimonials } from "@/lib/database";
import { Testimoni } from "../types/testimoni";

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
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 pb-20">
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <AppNavbar />
        <div className="text-center pt-20 pb-12">
          <h2 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Komentar Mereka Tentang Saya
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Apa kata mereka tentang pengalaman bekerja sama dengan saya
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {(data as Testimoni[]).map((testimoni, index) => (
            <TestimoniCard
              key={testimoni.id}
              testimoni={testimoni}
              tiltClass={TILT_CLASSES[index % TILT_CLASSES.length]}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
