import Link from "next/link";
import type { SiteData } from "@/types/content";
import { telHref } from "@/lib/utils";

export function Footer({ site }: { site: SiteData }) {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-tight">{site.companyName}</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Lokalny serwis telefonów — {site.serviceArea}.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Kontakt</p>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li>
              <a href={telHref(site.phone)} className="hover:text-[var(--text)]">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-[var(--text)]">
                {site.email}
              </a>
            </li>
            <li>{site.openingHours}</li>
            {site.city ? <li>{site.city}</li> : null}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Nawigacja</p>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li>
              <Link href="/#uslugi" className="hover:text-[var(--text)]">
                Usługi
              </Link>
            </li>
            <li>
              <Link href="/#cennik" className="hover:text-[var(--text)]">
                Cennik
              </Link>
            </li>
            <li>
              <Link href="/#kontakt" className="hover:text-[var(--text)]">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/polityka-prywatnosci" className="hover:text-[var(--text)]">
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-page border-t border-[var(--border)] py-5 text-sm text-[var(--text-muted)]">
        © {new Date().getFullYear()} {site.companyName}
      </div>
    </footer>
  );
}
