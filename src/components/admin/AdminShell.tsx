"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  CircleHelp,
  Eye,
  FileText,
  Home,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  MapPin,
  Palette,
  Settings,
  Smartphone,
  Tag,
  Bot,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/strona-glowna", label: "Strona główna", icon: Home },
  { href: "/admin/dane-firmy", label: "Dane firmy", icon: Building2 },
  { href: "/admin/uslugi", label: "Usługi", icon: Smartphone },
  { href: "/admin/cennik", label: "Cennik", icon: ListOrdered },
  { href: "/admin/realizacje", label: "Realizacje", icon: Eye },
  { href: "/admin/kategorie", label: "Kategorie", icon: Tag },
  { href: "/admin/faq", label: "FAQ", icon: CircleHelp },
  { href: "/admin/obszar", label: "Obszar działania", icon: MapPin },
  { href: "/admin/seo", label: "SEO", icon: FileText },
  { href: "/admin/seo/robots", label: "Robots", icon: Bot },
  { href: "/admin/wyglad", label: "Wygląd", icon: Palette },
  { href: "/admin/ustawienia", label: "Ustawienia", icon: Settings },
];

export function AdminShell({
  children,
  companyName,
}: {
  children: React.ReactNode;
  companyName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-[var(--border)] bg-[var(--bg-secondary)] md:min-h-screen md:border-b-0 md:border-r">
        <div className="px-4 py-5">
          <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Admin</p>
          <p className="mt-1 font-semibold">{companyName}</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:overflow-visible">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  active
                    ? "bg-[var(--surface)] text-[var(--text)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface)]"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={logout}
            className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface)]"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Wyloguj
          </button>
        </nav>
      </aside>
      <div className="p-4 md:p-8">{children}</div>
    </div>
  );
}
