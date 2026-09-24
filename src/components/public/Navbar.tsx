"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { telHref } from "@/lib/utils";

const LINKS = [
  { href: "/#uslugi", label: "Usługi" },
  { href: "/#cennik", label: "Cennik" },
  { href: "/#realizacje", label: "Realizacje" },
  { href: "/#jak-dzialamy", label: "Jak działamy" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function Navbar({
  companyName,
  phone,
  phoneDisplay,
  logo,
}: {
  companyName: string;
  phone: string;
  phoneDisplay: string;
  logo?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="h-8 w-auto" />
          ) : null}
          <span className="text-[15px] md:text-base">{companyName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Główne">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(phone)}
            className="hidden items-center gap-2 rounded-xl border border-[var(--border-strong)] px-3 py-2 text-sm text-[var(--text-secondary)] md:inline-flex"
          >
            <Phone className="h-4 w-4 text-[var(--accent)]" aria-hidden />
            {phoneDisplay}
          </a>
          <a href={telHref(phone)} className="btn btn-primary hidden sm:inline-flex">
            Zadzwoń
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--border)] bg-[var(--bg)] lg:hidden"
        >
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobilne">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={telHref(phone)}
              className="btn btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              Zadzwoń: {phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
