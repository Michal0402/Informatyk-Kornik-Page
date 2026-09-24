import type { SiteData } from "@/types/content";
import { telHref } from "@/lib/utils";

export function FinalCta({ site }: { site: SiteData }) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="card px-6 py-10 text-center md:px-12 md:py-14">
          <h2 className="section-title">Telefon wymaga naprawy?</h2>
          <p className="mx-auto section-lead">
            Zadzwoń albo podaj model telefonu i opisz problem.
          </p>
          <p className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
            <a href={telHref(site.phone)}>{site.phoneDisplay}</a>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref(site.phone)} className="btn btn-primary">
              Zadzwoń
            </a>
            <a href="#kontakt" className="btn btn-secondary">
              Wyślij zgłoszenie
            </a>
          </div>
          <p className="mt-5 text-sm text-[var(--text-muted)]">
            {site.openingHours} • {site.serviceArea}
          </p>
        </div>
      </div>
    </section>
  );
}
