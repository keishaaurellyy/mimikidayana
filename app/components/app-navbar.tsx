import Navbar from "@/app/components/ui/floating-navbar";

const items = [
  {
    label: "Profil",
    bgColor: "var(--color-secondary)",
    textColor: "var(--color-foreground)",
    links: [
      {
        label: "Biodata",
        ariaLabel: "Biodata",
        href: "/profile?section=biodata",
      },
      {
        label: "Visi-Misi",
        ariaLabel: "Visi Misi",
        href: "/profile?section=visi-misi",
      },
      {
        label: "Organisasi",
        ariaLabel: "Organisasi",
        href: "/profile?section=organisasi",
      },
      {
        label: "Pengalaman",
        ariaLabel: "Pengalaman",
        href: "/profile?section=pengalaman",
      },
    ],
  },
  {
    label: "Artikel",
    bgColor: "var(--color-secondary)",
    textColor: "var(--color-foreground)",
    links: [
      {
        label: "Prestasi",
        ariaLabel: "Prestasi",
        href: "/artikel?section=prestasi",
      },
      { label: "Berita", ariaLabel: "Berita", href: "/artikel?section=berita" },
    ],
  },
  {
    label: "Testimoni",
    bgColor: "var(--color-secondary)",
    textColor: "var(--color-foreground)",
    links: [
      {
        label: "Lihat Semua",
        ariaLabel: "Lihat Semua Testimoni",
        href: "/testimoni",
      },
    ],
  },
];

export default function AppNavbar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      <Navbar
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="var(--color-primary)"
        buttonTextColor="#fff"
        ease="power3.out"
      />
    </div>
  );
}
