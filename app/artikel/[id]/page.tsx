"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getDetailArtikel } from "@/app/hooks/mutation";
import { DetailArtikel } from "@/app/types/artikel";

export default function ArtikelDetail() {
  const params = useParams();
  const [artikel, setArtikel] = useState<DetailArtikel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const response = await getDetailArtikel(Number(params.id));
        setArtikel(response.data);
      } catch (error) {
        console.error("Error fetching artikel detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArtikel();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading artikel...</p>
        </div>
      </div>
    );
  }

  if (!artikel) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600">Artikel tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
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
          Kembali
        </button>
      </div>

      <article>
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full capitalize">
              {artikel.category}
            </span>
            <time dateTime={artikel.publishedDate}>
              {new Date(artikel.publishedDate).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {artikel.title}
          </h1>
        </header>

        {/* Featured Image */}
        {artikel.image && (
          <div className="mb-8">
            <Image
              src={artikel.image}
              alt={artikel.title}
              width={800}
              height={384}
              className="w-full h-96 object-cover rounded-lg"
              priority
            />
          </div>
        )}

        {/* Tags */}
        {artikel.tags && artikel.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {artikel.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag.tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {artikel.description}
          </div>
        </div>
      </article>
    </div>
  );
}
