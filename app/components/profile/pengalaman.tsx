"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ProfileData } from "@/app/types/profiles";

type ExperienceWithImage = ProfileData["experience"][number] & {
  image?: string | null;
};

const VISIBLE_COUNT = 3;

export default function Pengalaman({ profile }: { profile: ProfileData }) {
  const experiences = useMemo(
    () => (profile.experience ?? []) as ExperienceWithImage[],
    [profile.experience],
  );
  const [startIndex, setStartIndex] = useState(0);

  const visibleExperiences = useMemo(
    () => experiences.slice(startIndex, startIndex + VISIBLE_COUNT),
    [experiences, startIndex],
  );

  if (experiences.length === 0) return null;

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + VISIBLE_COUNT < experiences.length;

  const handlePrev = () => {
    if (!canScrollLeft) return;
    setStartIndex((prev) => Math.max(0, prev - VISIBLE_COUNT));
  };

  const handleNext = () => {
    if (!canScrollRight) return;
    setStartIndex((prev) =>
      Math.min(experiences.length - VISIBLE_COUNT, prev + VISIBLE_COUNT),
    );
  };

  return (
    <div className="flex flex-col gap-8 items-start mt-16">
      <div className="flex flex-row justify-between items-center mb-8 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-2">
            Pengalaman
          </h2>
          <p className="text-lg text-gray-600">
            Explore our remarkable achievements and milestones that showcase
            excellence and innovation in every endeavor.
          </p>
        </div>

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canScrollLeft}
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Sebelumnya"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canScrollRight}
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Berikutnya"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleExperiences.map((exp, index) => {
          const imageUrl = exp.image?.trim() || "/fallback.jpg";

          return (
            <div
              key={`${exp.experience}-${exp.startYear}-${index}`}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <Image
                src={imageUrl}
                alt={exp.experience || "experience image"}
                fill
                className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                onError={(event) => {
                  const img = event.currentTarget;
                  if (img.dataset.fallback === "true") return;
                  img.dataset.fallback = "true";
                  img.src = "/fallback.jpg";
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

              {/* Text */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
                <p className="text-sm text-white/80 mb-1">
                  {exp.startYear} — {exp.endYear}
                </p>
                <h3 className="text-lg md:text-xl font-semibold leading-snug">
                  {exp.experience}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
