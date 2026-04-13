"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getArticle, updateArticle } from "@/lib/api";
import type { Article } from "@/lib/types";
import ArticleForm from "@/components/article-form";
import { ChevronLeft } from "lucide-react";

export default function EditBeritaPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticle(id)
      .then(({ data }) => setArticle(data))
      .catch(() => router.push("/berita"))
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleSubmit(data: Partial<Article>) {
    await updateArticle(Number(id), data);
    router.push("/berita");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
        Memuat...
      </div>
    );
  }

  if (!article) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <a
          href="/berita"
          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </a>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Berita</h1>
          <p className="text-slate-500 text-sm mt-0.5 truncate max-w-xs">
            {article.title}
          </p>
        </div>
      </div>

      <ArticleForm
        initial={article}
        category="news"
        onSubmit={handleSubmit}
        submitLabel="Simpan Perubahan"
      />
    </div>
  );
}
