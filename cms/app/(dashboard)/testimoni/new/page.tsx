"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial } from "@/lib/api";
import type { Testimonial } from "@/lib/types";
import { ChevronLeft, Save } from "lucide-react";
import ImageUpload from "@/components/image-upload";

const inputClass =
  "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white";

export default function NewTestimoniPage() {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Testimonial>>({
    name: "",
    position: "",
    profileImage: "",
    review: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(key: keyof Testimonial, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createTestimonial(form);
      router.push("/testimoni");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.");
      setSaving(false);
    }
  }

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
          <h1 className="text-2xl font-bold text-slate-900">
            Tambah Testimoni
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Buat testimoni baru</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
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
                placeholder="Nama pemberi testimoni"
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
                placeholder="Jabatan / profesi"
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
                placeholder="Isi testimoni..."
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
            {saving ? "Menyimpan..." : "Tambah Testimoni"}
          </button>
        </div>
      </form>
    </div>
  );
}
