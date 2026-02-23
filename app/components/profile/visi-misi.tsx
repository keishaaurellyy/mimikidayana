import { ProfileData } from "@/app/types/profiles";
import ReactMarkdown from "react-markdown";
import TextType from "../ui/text-type";

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
          <div
            className="prose max-w-none
          prose-p:text-foreground/80 prose-p:text-sm prose-p:leading-relaxed prose-p:text-justify
          prose-strong:text-primary prose-strong:font-bold
          prose-headings:text-foreground prose-headings:font-black"
          >
            <ReactMarkdown>{profile.vision}</ReactMarkdown>
          </div>
        </div>

        <div className="relative bg-white border border-l-8 border-b-8 border-secondary rounded-lg p-8 md:p-10 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.75 bg-primary rounded-lg" />
            <span className="text-primary text-md font-bold tracking-[0.2em] uppercase">
              Misi
            </span>
          </div>
          <div
            className="prose max-w-none
          prose-p:text-foreground/80 prose-p:text-sm prose-p:leading-relaxed prose-p:text-justify prose-p:my-1
          prose-ul:text-foreground/80 prose-ul:text-sm
          prose-li:marker:text-primary prose-li:my-0.5
          prose-strong:text-primary prose-strong:font-bold
          prose-headings:text-foreground prose-headings:font-black"
          >
            <ReactMarkdown>{profile.mission}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
