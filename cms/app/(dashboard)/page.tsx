"use client";

import { useEffect, useState } from "react";
import { getArticles, getTestimonials, getComments } from "@/lib/api";
import { Newspaper, Star, MessageSquare, Trophy } from "lucide-react";

interface StatCard {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    news: 0,
    achievement: 0,
    testimonials: 0,
    comments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [news, achievements, testimonials, comments] = await Promise.all([
          getArticles("news"),
          getArticles("achievement"),
          getTestimonials(),
          getComments(),
        ]);
        setStats({
          news: news.data?.length ?? 0,
          achievement: achievements.data?.length ?? 0,
          testimonials: testimonials.data?.length ?? 0,
          comments: comments.data?.length ?? 0,
        });
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards: StatCard[] = [
    {
      label: "Berita",
      value: stats.news,
      icon: <Newspaper className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      label: "Prestasi",
      value: stats.achievement,
      icon: <Trophy className="w-5 h-5" />,
      color: "bg-amber-500",
    },
    {
      label: "Testimoni",
      value: stats.testimonials,
      icon: <Star className="w-5 h-5" />,
      color: "bg-purple-500",
    },
    {
      label: "Aspirasi Masuk",
      value: stats.comments,
      icon: <MessageSquare className="w-5 h-5" />,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Selamat datang di panel admin Hj. Mimik Idayana
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100"
          >
            <div
              className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${card.color} text-white mb-4`}
            >
              {card.icon}
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {loading ? (
                <span className="inline-block w-8 h-7 bg-slate-100 rounded animate-pulse" />
              ) : (
                card.value
              )}
            </div>
            <div className="text-sm text-slate-500 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-semibold text-slate-900 mb-3">Akses Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Tambah Berita", href: "/berita/new" },
            { label: "Tambah Prestasi", href: "/prestasi/new" },
            { label: "Tambah Testimoni", href: "/testimoni/new" },
            { label: "Lihat Aspirasi", href: "/aspirasi" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-center text-sm px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
