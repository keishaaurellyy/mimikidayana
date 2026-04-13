"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import type { Article, Tag } from "@/lib/types";
import ImageUpload from "@/components/image-upload";

interface Props {
  initial?: Partial<Article>;
  category: "news" | "achievement";
  onSubmit: (data: Partial<Article>) => Promise<void>;
  submitLabel?: string;
}

const inputClass =
  "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white";

export default function ArticleForm({
  initial,
  category,
  onSubmit,
  submitLabel = "Simpan",
}: Props) {
  const [form, setForm] = useState<Partial<Article>>({
    title: "",
    slug: "",
    publishedDate: "",
    image: "",
    description: "",
    tags: [],
    ...initial,
    category,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [newTag, setNewTag] = useState("");

  function set(key: keyof Article, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function autoSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    set("title", title);
    if (!form.id) {
      set("slug", autoSlug(title));
    }
  }

  function addTag() {
    const tag = newTag.trim();
    if (!tag) return;
    set("tags", [...(form.tags ?? []), { tag }]);
    setNewTag("");
  }

  function removeTag(idx: number) {
    set(
      "tags",
      (form.tags ?? []).filter((_: Tag, i: number) => i !== idx),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await onSubmit(form);
      setMessage({ type: "success", text: "Berhasil disimpan." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Gagal menyimpan.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Judul <span className="text-red-500">*</span>
            </label>
            <input
              value={form.title ?? ""}
              onChange={handleTitleChange}
              required
              className={inputClass}
              placeholder="Judul artikel"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Slug
            </label>
            <input
              value={form.slug ?? ""}
              onChange={(e) => set("slug", e.target.value)}
              className={inputClass}
              placeholder="url-friendly-slug"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Tanggal Publikasi
            </label>
            <input
              type="date"
              value={form.publishedDate ?? ""}
              onChange={(e) => set("publishedDate", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <ImageUpload
              label="Gambar Artikel"
              value={form.image ?? ""}
              onChange={(url) => set("image", url)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Deskripsi (mendukung Markdown)
            </label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              rows={8}
              className={inputClass}
              placeholder="Tulis konten artikel di sini..."
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Tags
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {(form.tags ?? []).map((t: Tag, idx: number) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-full"
              >
                {t.tag}
                <button
                  type="button"
                  onClick={() => removeTag(idx)}
                  className="hover:text-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              className={inputClass}
              placeholder="Ketik tag lalu Enter"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? "Menyimpan..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
