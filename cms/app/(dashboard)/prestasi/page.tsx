"use client";

import { useEffect, useState } from "react";
import { getArticles, deleteArticle } from "@/lib/api";
import type { Article } from "@/lib/types";
import { Plus, Pencil } from "lucide-react";
import DeleteButton from "@/components/delete-button";

export default function PrestasiPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await getArticles("achievement");
      setArticles(res.data ?? []);
    } catch {
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: number) {
    await deleteArticle(id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prestasi</h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola artikel prestasi
          </p>
        </div>
        <a
          href="/prestasi/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Prestasi
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Memuat...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Belum ada prestasi.{" "}
            <a href="/prestasi/new" className="text-slate-900 underline">
              Tambah sekarang
            </a>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-slate-600">Judul</th>
                <th className="text-left px-5 py-3 font-medium text-slate-600 hidden md:table-cell">Tanggal</th>
                <th className="text-left px-5 py-3 font-medium text-slate-600 hidden md:table-cell">Tags</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-900">{a.title}</td>
                  <td className="px-5 py-3 text-slate-500 hidden md:table-cell">
                    {a.publishedDate
                      ? new Date(a.publishedDate).toLocaleDateString("id-ID")
                      : "—"}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(a.tags ?? []).slice(0, 3).map((t, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                          {t.tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/prestasi/${a.id}`}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </a>
                      <DeleteButton onDelete={() => handleDelete(a.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
