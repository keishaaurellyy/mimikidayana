import { Testimoni } from "@/app/types/testimoni";
import { truncate } from "@/app/libs/utils";
import Image from "next/image";

function getImageSrc(url: string) {
  try {
    new URL(url);
    return url;
  } catch {
    return "/1.png";
  }
}

function Card({ testimonials }: { testimonials: Testimoni[] }) {
  const featured = testimonials[0];

  return (
    <div className="rounded-2xl bg-background/70">
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-5">
        <article className="rounded-2xl border border-foreground/10 bg-white p-5 shadow-sm lg:col-span-3">
          {featured ? (
            <>
              <p className="text-3xl font-black leading-none text-primary">“</p>
              <p className="mt-2 text-base leading-relaxed text-foreground/80 md:text-lg">
                {truncate(featured.review, 220)}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={getImageSrc(featured.profileImage)}
                    alt={featured.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground md:text-base">
                    {featured.name}
                  </p>
                  <p className="text-xs text-foreground/60 md:text-sm">
                    {featured.position}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-foreground/60 md:text-base">
              Belum ada testimonial unggulan.
            </p>
          )}
        </article>

        <div className="flex w-full flex-col gap-3 lg:col-span-2">
          {testimonials.slice(1, 5).map((item) => (
            <article
              key={`option-b-${item.id}`}
              className="w-full rounded-xl border border-foreground/10 bg-white p-3"
            >
              <p className="text-sm font-semibold text-foreground line-clamp-1">
                {item.name}
              </p>
              <p className="text-xs text-foreground/55 line-clamp-1">
                {item.position}
              </p>
              <p className="mt-2 text-sm text-foreground/75 line-clamp-2">
                “{truncate(item.review, 100)}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSummary({
  testimonials,
}: {
  testimonials: Testimoni[];
}) {
  return (
    <section className="relative z-10 px-6 md:px-12 lg:px-32 pb-20 md:pb-24">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-foreground/10 bg-white/70 p-6 md:p-10 shadow-sm backdrop-blur-sm">
        <div className="mb-6 w-full">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary md:text-sm">
            Ringkasan Testimoni
          </p>
          <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Suara Mereka Tentang Saya
          </h2>
          <p className="mt-2 text-sm text-foreground/70 md:text-base">
            Testimoni pilihan dari rekan dan masyarakat sebagai gambaran dampak
            kerja nyata.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="w-full rounded-2xl bg-background/60 px-6 py-10 text-center text-sm text-foreground/60 md:text-base">
            Belum ada testimonial untuk ditampilkan.
          </div>
        ) : (
          <Card testimonials={testimonials} />
        )}
      </div>
    </section>
  );
}
