import { ProfileData } from "@/app/types/profiles";
import SpotlightCard from "../ui/spotlight-card";
import CircularGallery from "../ui/circular-gallery";
import ReactMarkdown from "react-markdown";

export default function Biodata({ profile }: { profile: ProfileData }) {
  const galleryItems = profile.carousel.map((item) => ({
    image: item.imageCarousel,
    text: "",
  }));
  console.log(profile.biodata);

  return (
    <div>
      <SpotlightCard
        className="w-full rounded-2xl bg-(--color-primary)"
        spotlightColor="rgba(255, 180, 180, 0.45)"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-8 md:p-12">
          {/* kiri */}
          <div className="flex flex-col gap-4 text-white md:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight">Biodata</h2>
            <div className="text-white leading-relaxed prose prose-invert">
              <ReactMarkdown>{profile.biodata}</ReactMarkdown>
            </div>
          </div>

          {/* kanan */}
          <div className="flex flex-col gap-4 text-white">
            <h2 className="text-2xl font-bold tracking-tight">Pendidikan</h2>
            {profile.education.map((edu, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex flex-row justify-between font-semibold">
                  <span>{edu.school}</span>
                  <span>
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <span>{edu.location}</span>
              </div>
            ))}
          </div>
        </div>
      </SpotlightCard>

      <div style={{ height: "550px", position: "relative" }}>
        <CircularGallery
          items={galleryItems}
          textColor="#ffffff"
          bend={-1}
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
    </div>
  );
}
