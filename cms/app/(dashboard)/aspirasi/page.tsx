"use client";

import { useEffect, useState } from "react";
import { getComments, deleteComment } from "@/lib/api";
import type { Comment } from "@/lib/types";
import { Mail, Phone } from "lucide-react";
import DeleteButton from "@/components/delete-button";

export default function AspirasiPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComments()
      .then(({ data }) => setComments(data ?? []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    await deleteComment(id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Aspirasi</h1>
        <p className="text-slate-500 text-sm mt-1">
          Pesan & aspirasi yang dikirim melalui website
        </p>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 text-sm py-12">Memuat...</div>
      ) : comments.length === 0 ? (
        <div className="text-center text-slate-400 text-sm py-12">
          Belum ada aspirasi masuk.
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="font-semibold text-slate-900">{c.name}</span>
                    <span className="text-xs text-slate-400">
                      {c.created_at
                        ? new Date(c.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {c.email}
                    </span>
                    {c.phone_number && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {c.phone_number}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-700 whitespace-pre-wrap">
                    {c.aspiration}
                  </p>
                </div>

                <div className="shrink-0">
                  <DeleteButton onDelete={() => handleDelete(c.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
