"use client";

import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/api";
import type { Article } from "@/lib/types";
import ArticleForm from "@/components/article-form";
import { ChevronLeft } from "lucide-react";

export default function NewPrestasiPage() {
  const router = useRouter();

  async function handleSubmit(data: Partial<Article>) {
    await createArticle({ ...data, category: "achievement" });
    router.push("/prestasi");
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <a
          href="/prestasi"
          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </a>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tambah Prestasi</h1>
          <p className="text-slate-500 text-sm mt-0.5">Buat artikel prestasi baru</p>
        </div>
      </div>

      <ArticleForm
        category="achievement"
        onSubmit={handleSubmit}
        submitLabel="Tambah Prestasi"
      />
    </div>
  );
}
