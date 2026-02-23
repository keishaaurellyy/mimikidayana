import { Suspense } from "react";
import AppNavbar from "../components/app-navbar";
import Biodata from "../components/profile/biodata";
import VisiMisi from "../components/profile/visi-misi";
import { getProfiles } from "../hooks/mutation";
import ScrollToSection from "../components/scroll-to-section";

export default async function ProfilePage() {
  const { data: profile } = await getProfiles();

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
        {/* <Organisasi profile={profile} /> */}
      </section>

      <section id="pengalaman">
        {/* <Pengalaman profile={profile} /> */}
      </section>
    </main>
  );
}
