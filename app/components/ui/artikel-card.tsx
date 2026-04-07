import Image from "next/image";
import Link from "next/link";
import { Artikel } from "@/app/types/artikel";

export default function ArtikelCard(artikel: Artikel) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={
            typeof artikel.image === "string"
              ? artikel.image
              : artikel.image.url
          }
          alt={artikel.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {artikel.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {artikel.description}
        </p>
        <Link
          href={`/artikel/${artikel.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
        >
          Read More
          <svg
            className="w-4 h-4 ml-1"
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
        </Link>
      </div>
    </div>
  );
}
