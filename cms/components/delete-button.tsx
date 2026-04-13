"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  onDelete: () => Promise<void>;
  label?: string;
}

export default function DeleteButton({ onDelete, label = "Hapus" }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "..." : "Ya, hapus"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
        >
          Batal
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1 text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
    >
      <Trash2 className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}
