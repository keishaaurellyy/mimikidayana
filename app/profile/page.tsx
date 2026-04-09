import { Suspense } from "react";
import AppNavbar from "../components/app-navbar";
import Biodata from "../components/profile/biodata";
import VisiMisi from "../components/profile/visi-misi";
import Organisasi from "../components/profile/organisasi";
import { getProfile } from "@/lib/database";
import ScrollToSection from "../components/scroll-to-section";
import Pengalaman from "../components/profile/pengalaman";

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Profile not found
      </div>
    );
  }

  return (
    <main className="px-10 py-16 flex flex-col">
      <AppNavbar />

      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>

      <section id="biodata">
        <Biodata profile={profile} />
      </section>

      <section id="visi-misi">
        <VisiMisi profile={profile} />
      </section>

      <section id="organisasi">
        <Organisasi profile={profile} />
      </section>

      <section id="pengalaman">
        <Pengalaman profile={profile} />
      </section>
    </main>
  );
}
