"use client";

import { useState, useEffect } from "react";
import ArtikelCard from "../ui/artikel-card";
import { getArtikel } from "@/app/hooks/mutation";
import { Artikel } from "@/app/types/artikel";

export default function Prestasi() {
  const [artikels, setArtikels] = useState<Artikel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchArtikels = async () => {
      try {
        const response = await getArtikel();
        const prestasiArtikels = response.data.filter(
          (artikel) => artikel.category === "achievement",
        );
        setArtikels(prestasiArtikels);
        console.log("✅ Successfully fetched prestasi articles");
      } catch (error) {
        console.error("Error fetching artikels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtikels();
  }, []);

  const handlePrevious = () => {
    const maxIndex = Math.max(0, artikels.length - itemsPerPage);
    setCurrentIndex((prev) => (prev > 0 ? prev - itemsPerPage : maxIndex));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, artikels.length - itemsPerPage);
    setCurrentIndex((prev) => (prev < maxIndex ? prev + itemsPerPage : 0));
  };

  const getDisplayedArtikels = () => {
    return artikels.slice(currentIndex, currentIndex + itemsPerPage);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading prestasi...</p>
        </div>
      </div>
    );
  }

  if (artikels.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600">No prestasi articles found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Prestasi</h2>
          <p className="text-lg text-gray-600">
            Explore our remarkable achievements and milestones that showcase
            excellence and innovation in every endeavor.
          </p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={artikels.length <= 1}
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
            onClick={handleNext}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={artikels.length <= 1}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getDisplayedArtikels().map((artikel, index) => (
          <ArtikelCard
            key={`${artikel.id}-${artikel.title}-${index}`}
            {...artikel}
          />
        ))}
      </div>
    </div>
  );
}
