import { Suspense } from "react";
import AppNavbar from "../components/app-navbar";
import ScrollToSection from "../components/scroll-to-section";
import Prestasi from "../components/artikel/prestasi";
import Berita from "../components/artikel/berita";

export default async function ProfilePage() {
  return (
    <main className="px-10 py-16 flex flex-col">
      <AppNavbar />

      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>

      <section id="prestasi">
        <Prestasi />
      </section>

      <section id="berita">
        <Berita />
      </section>
    </main>
  );
}
