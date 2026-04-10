import { Artikel } from "@/app/types/artikel";
import { truncate } from "@/app/libs/utils";
import Image from "next/image";
import Link from "next/link";

export default function ArtikelSummary({ artikels }: { artikels: Artikel[] }) {
  const newsCount = artikels.filter((item) => item.category === "news").length;
  const achievementCount = artikels.filter(
    (item) => item.category === "achievement",
  ).length;
  const highlightedArticles = artikels.slice(0, 3);

  return (
    <section className="relative z-10 px-6 md:px-12 lg:px-32 pb-20 md:pb-24">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-foreground/10 bg-white/70 p-6 md:p-10 shadow-sm backdrop-blur-sm">
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="w-full md:w-3/5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary md:text-sm">
              Ringkasan Artikel
            </p>
            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Wawasan, Berita, dan Prestasi
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70 md:text-base">
              Highlight artikel terbaru untuk melihat isu utama, capaian, dan
              perkembangan yang sedang dibahas.
            </p>
          </div>
          <Link
            href="/artikel"
            className="inline-flex w-fit items-center justify-center rounded-xl border border-primary/30 bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Lihat Semua Artikel
          </Link>
        </div>

        <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
          <div className="rounded-xl border border-foreground/10 bg-background/80 px-4 py-3 text-center">
            <p className="text-2xl font-black text-primary md:text-3xl">
              {artikels.length}
            </p>
            <p className="text-xs text-foreground/70 md:text-sm">
              Total Artikel
            </p>
          </div>
          <div className="rounded-xl border border-foreground/10 bg-background/80 px-4 py-3 text-center">
            <p className="text-2xl font-black text-primary md:text-3xl">
              {newsCount}
            </p>
            <p className="text-xs text-foreground/70 md:text-sm">Berita</p>
          </div>
          <div className="rounded-xl border border-foreground/10 bg-background/80 px-4 py-3 text-center">
            <p className="text-2xl font-black text-primary md:text-3xl">
              {achievementCount}
            </p>
            <p className="text-xs text-foreground/70 md:text-sm">Prestasi</p>
          </div>
        </div>

        <div className="mt-6 grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {highlightedArticles.map((artikel) => {
            const imageUrl =
              typeof artikel.image === "string"
                ? artikel.image
                : artikel.image.url;

            return (
              <Link
                key={artikel.id}
                href={`/artikel/${artikel.id}`}
                className="group w-full overflow-hidden rounded-2xl border border-foreground/10 bg-white/80 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={imageUrl}
                    alt={artikel.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium capitalize text-white">
                    {artikel.category === "achievement" ? "Prestasi" : "Berita"}
                  </span>
                </div>
                <div className="w-full p-4">
                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground md:text-lg">
                    {artikel.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {truncate(artikel.description, 120)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {artikels.length === 0 && (
          <div className="mt-6 w-full rounded-2xl border border-dashed border-foreground/20 bg-background/60 px-6 py-10 text-center text-sm text-foreground/60 md:text-base">
            Belum ada artikel untuk ditampilkan.
          </div>
        )}
      </div>
    </section>
  );
}
