"use client";

import { Testimoni } from "@/app/types/testimoni";
import Image from "next/image";
import { useState } from "react";

interface Props {
  testimoni: Testimoni;
  tiltClass?: string;
}

export default function TestimoniCard({
  testimoni,
  tiltClass = "hover:-rotate-2 hover:-translate-y-1",
}: Props) {
  const getValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return url;
    } catch {
      return "/1.png";
    }
  };

  const validImageUrl = getValidImageUrl(testimoni.profileImage);
  const [imageSrc, setImageSrc] = useState(validImageUrl);

  return (
    <div
      className={`
        flex flex-col gap-3 p-6 rounded-2xl
        border border-gray-200 bg-white
        transition-transform duration-300 ease-out cursor-pointer shadow-stone-300 shadow-lg
        ${tiltClass}
      `}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="relative h-14 w-14 overflow-hidden rounded-full">
          <Image
            src={imageSrc}
            alt={testimoni.name}
            fill
            sizes="56px"
            className="object-cover object-center"
            onError={() => setImageSrc("/1.png")}
          />
        </div>
        <p className="font-semibold text-lg text-gray-900">{testimoni.name}</p>
        <p className="text-gray-400">{testimoni.position}</p>
      </div>
      <p className="text-gray-600 text-center leading-relaxed break-all">
        {testimoni.review}
      </p>
    </div>
  );
}
