"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload gagal");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="h-32 w-auto max-w-xs rounded-lg border border-slate-200 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700"
          >
            <Upload className="w-3.5 h-3.5" />
            Ganti foto
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 w-full h-32 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-colors"
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
              <span className="text-xs text-slate-400">Mengupload...</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-6 h-6 text-slate-300" />
              <span className="text-xs text-slate-400 text-center px-4">
                Klik atau drag & drop foto di sini
                <br />
                <span className="text-slate-300">PNG, JPG, WebP — maks 5MB</span>
              </span>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
