"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTestimonial, updateTestimonial } from "@/lib/api";
import type { Testimonial } from "@/lib/types";
import { ChevronLeft, Save } from "lucide-react";
import ImageUpload from "@/components/image-upload";

const inputClass =
  "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white";

export default function EditTestimoniPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<Partial<Testimonial> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    getTestimonial(Number(id))
      .then(({ data }) => setForm(data))
      .catch(() => router.push("/testimoni"))
      .finally(() => setLoading(false));
  }, [id, router]);

  function set(key: keyof Testimonial, value: string) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      await updateTestimonial(Number(id), form);
      setMessage({ type: "success", text: "Testimoni berhasil diperbarui." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Gagal menyimpan.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
        Memuat...
      </div>
    );
  }

  if (!form) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <a
          href="/testimoni"
          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </a>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Testimoni</h1>
          <p className="text-slate-500 text-sm mt-0.5">{form.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {message && (
          <div
            className={`mb-4 px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                value={form.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Jabatan
              </label>
              <input
                value={form.position ?? ""}
                onChange={(e) => set("position", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <ImageUpload
                label="Foto Profil"
                value={form.profileImage ?? ""}
                onChange={(url) => set("profileImage", url)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Review <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.review ?? ""}
                onChange={(e) => set("review", e.target.value)}
                required
                rows={5}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
