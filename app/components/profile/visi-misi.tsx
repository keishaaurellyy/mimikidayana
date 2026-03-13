import { ProfileData } from "@/app/types/profiles";
import TextType from "../ui/text-type";
import MarkdownRenderer from "../ui/markdown-renderer";

export default function VisiMisi({ profile }: { profile: ProfileData }) {
  return (
    <div className="flex flex-col gap-8 items-center">
      <TextType
        className="font-bold text-5xl text-primary"
        text={["Visi & Misi"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor
        cursorCharacter="_"
        deletingSpeed={50}
        cursorBlinkDuration={0.5}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative bg-white border border-l-8 border-b-8 border-secondary rounded-lg p-8 md:p-10 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.75 bg-primary rounded-lg" />
            <span className="text-primary text-md font-bold tracking-[0.2em] uppercase">
              Visi
            </span>
          </div>
          <MarkdownRenderer content={profile.vision} />
        </div>

        <div className="relative bg-white border border-l-8 border-b-8 border-secondary rounded-lg p-8 md:p-10 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.75 bg-primary rounded-lg" />
            <span className="text-primary text-md font-bold tracking-[0.2em] uppercase">
              Misi
            </span>
          </div>
          <MarkdownRenderer content={profile.mission} />
        </div>
      </div>
    </div>
  );
}
