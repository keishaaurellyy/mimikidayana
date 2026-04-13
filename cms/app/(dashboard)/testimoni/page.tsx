"use client";

import { useEffect, useState } from "react";
import { getTestimonials, deleteTestimonial } from "@/lib/api";
import type { Testimonial } from "@/lib/types";
import { Plus, Pencil } from "lucide-react";
import DeleteButton from "@/components/delete-button";

export default function TestimoniPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials()
      .then(({ data }) => setItems(data ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    await deleteTestimonial(id);
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimoni</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola ulasan & testimoni</p>
        </div>
        <a
          href="/testimoni/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Testimoni
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Belum ada testimoni.{" "}
            <a href="/testimoni/new" className="text-slate-900 underline">
              Tambah sekarang
            </a>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-slate-600">Nama</th>
                <th className="text-left px-5 py-3 font-medium text-slate-600 hidden md:table-cell">Jabatan</th>
                <th className="text-left px-5 py-3 font-medium text-slate-600 hidden lg:table-cell">Review</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-900">{t.name}</td>
                  <td className="px-5 py-3 text-slate-500 hidden md:table-cell">
                    {t.position || "—"}
                  </td>
                  <td className="px-5 py-3 text-slate-500 hidden lg:table-cell max-w-xs">
                    <span className="line-clamp-2">{t.review}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/testimoni/${t.id}`}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </a>
                      <DeleteButton onDelete={() => handleDelete(t.id)} />
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
