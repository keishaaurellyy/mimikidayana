import { stripMarkdown, truncate } from "@/app/libs/utils";
import { ProfileData } from "@/app/types/profiles";

export default function ProfileSummary({ profile }: { profile: ProfileData }) {
  const bioSummary = truncate(stripMarkdown(profile.biodata), 220);
  const visionSummary = truncate(stripMarkdown(profile.vision), 120);
  const missionSummary = truncate(stripMarkdown(profile.mission), 120);

  return (
    <section className="relative z-10 px-6 md:px-12 lg:px-32 py-16 md:py-24">
      <div className="mx-auto max-w-6xl rounded-3xl border border-foreground/10 bg-white/70 p-6 md:p-10 shadow-sm backdrop-blur-sm">
        <div className="mb-8 md:mb-10">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-3">
            Ringkasan Profil
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            {profile.name}
          </h2>
          <p className="mt-2 text-foreground/70 text-base md:text-lg">
            {profile.position}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          <div className="rounded-2xl border border-foreground/10 bg-background/80 p-5 md:p-6">
            <h3 className="text-lg font-bold text-primary mb-3">Biodata</h3>
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              {bioSummary}
            </p>
          </div>

          <div className="rounded-2xl border border-foreground/10 bg-background/80 p-5 md:p-6">
            <h3 className="text-lg font-bold text-primary mb-3">Visi</h3>
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              {visionSummary}
            </p>
          </div>

          <div className="rounded-2xl border border-foreground/10 bg-background/80 p-5 md:p-6">
            <h3 className="text-lg font-bold text-primary mb-3">Misi</h3>
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              {missionSummary}
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 md:gap-4">
          <div className="rounded-xl border border-foreground/10 bg-background/80 px-4 py-3 text-center">
            <p className="text-2xl md:text-3xl font-black text-primary">
              {profile.education.length}
            </p>
            <p className="text-xs md:text-sm text-foreground/70">Pendidikan</p>
          </div>
          <div className="rounded-xl border border-foreground/10 bg-background/80 px-4 py-3 text-center">
            <p className="text-2xl md:text-3xl font-black text-primary">
              {profile.organization.length}
            </p>
            <p className="text-xs md:text-sm text-foreground/70">Organisasi</p>
          </div>
          <div className="rounded-xl border border-foreground/10 bg-background/80 px-4 py-3 text-center">
            <p className="text-2xl md:text-3xl font-black text-primary">
              {profile.experience.length}
            </p>
            <p className="text-xs md:text-sm text-foreground/70">Pengalaman</p>
          </div>
        </div>
      </div>
    </section>
  );
}
