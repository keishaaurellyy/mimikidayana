import { ProfilesResponse } from "@/app/types/profiles";
import Badge from "../ui/badge";
import Image from "next/image";

export default function Landing({
  profile,
}: {
  profile: ProfilesResponse["data"];
}) {
  return (
    <div className="relative min-h-screen">
      {/* left content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 md:px-12 lg:px-32 pt-24 pb-8">
        <div className="w-1/2 flex flex-col items-start text-left">
          <Badge label={profile.position} variant="outline" className="mb-5" />

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-5">
            Siap Akselerasi{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, hsl(0,100%,38%) 0%, hsl(20,100%,45%) 50%, hsl(48,100%,50%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Bangun Sidoarjo
            </span>
          </h1>

          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-md">
            {profile.description}
          </p>
        </div>
      </div>

      {/* image — absolute bottom-right, nempel ke bawah hero */}
      <div className="absolute bottom-0 right-18 z-20">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 pointer-events-none"
            // style={{
            //   background:
            //     "linear-gradient(135deg, hsla(48,100%,50%,0.12) 0%, transparent 50%, hsla(0,100%,30%,0.15) 100%)",
            // }}
          />
          <Image
            width={700}
            height={900}
            src={profile.imageProfile}
            alt={profile.name}
            className="w-auto h-[85vh] max-h-187.5 object-cover object-top"
            priority
          />
        </div>
      </div>
    </div>
  );
}
