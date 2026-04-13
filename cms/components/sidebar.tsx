"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Newspaper,
  Star,
  MessageSquare,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <User className="w-4 h-4" />,
  },
  {
    label: "Artikel",
    icon: <Newspaper className="w-4 h-4" />,
    children: [
      { label: "Berita", href: "/berita" },
      { label: "Prestasi", href: "/prestasi" },
    ],
  },
  {
    label: "Testimoni",
    href: "/testimoni",
    icon: <Star className="w-4 h-4" />,
  },
  {
    label: "Aspirasi",
    href: "/aspirasi",
    icon: <MessageSquare className="w-4 h-4" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [artikelOpen, setArtikelOpen] = useState(
    pathname.startsWith("/berita") || pathname.startsWith("/prestasi"),
  );

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-65 bg-slate-900 flex flex-col z-50">
      <div className="px-6 py-5 border-b border-slate-800">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">
          CMS Admin
        </p>
        <h2 className="text-white font-semibold text-base leading-tight">
          Mimik Idayana
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <li key={item.label}>
                  <button
                    onClick={() => setArtikelOpen((v) => !v)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      pathname.startsWith("/berita") ||
                      pathname.startsWith("/prestasi")
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${artikelOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {artikelOpen && (
                    <ul className="mt-0.5 ml-7 space-y-0.5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                              isActive(child.href)
                                ? "bg-white text-slate-900 font-medium"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                            }`}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive(item.href!)
                      ? "bg-white text-slate-900 font-medium"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
