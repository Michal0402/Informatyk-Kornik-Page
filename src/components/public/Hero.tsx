import { Clock, MapPin, Package, Wallet } from "lucide-react";
import type { HeroData, SiteData } from "@/types/content";
import { telHref } from "@/lib/utils";

export function Hero({ hero, site }: { hero: HeroData; site: SiteData }) {
  return (
    <section className="section pt-10 md:pt-16">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
            {hero.badge}
          </p>
          <h1 className="m-0 text-[clamp(2.375rem,6vw,4.1rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
            {hero.title}
          </h1>
          <p className="mt-4 text-lg font-medium text-[var(--text)] md:text-xl">
            {hero.subtitle}
          </p>
          <p className="mt-3 max-w-xl text-[var(--text-secondary)]">{hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={telHref(site.phone)} className="btn btn-primary">
              {hero.primaryCta}: {site.phoneDisplay}
            </a>
            <a href="#cennik" className="btn btn-secondary">
              {hero.secondaryCta}
            </a>
          </div>
          <p className="mt-4 text-sm text-[var(--text-muted)]">{hero.note}</p>
        </div>

        <aside className="card p-6 md:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
            {site.companyShortName}
          </p>
          <dl className="mt-5 space-y-4">
            <div className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
              <div>
                <dt className="font-medium">Kontakt</dt>
                <dd className="text-sm text-[var(--text-secondary)]">{site.openingHours}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Package className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
              <div>
                <dt className="font-medium">Odbiór urządzenia</dt>
                <dd className="text-sm text-[var(--text-secondary)]">{site.serviceArea}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
              <div>
                <dt className="font-medium">Wycena</dt>
                <dd className="text-sm text-[var(--text-secondary)]">
                  Przed większą naprawą
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
              <div>
                <dt className="font-medium">Obsługiwane marki</dt>
                <dd className="text-sm text-[var(--text-secondary)]">
                  Apple • Samsung • Xiaomi • Android
                </dd>
              </div>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
