import type { LocationItem, SiteData } from "@/types/content";
import { ContactForm } from "./ContactForm";
import { telHref } from "@/lib/utils";

export function ContactSection({
  site,
  locations,
}: {
  site: SiteData;
  locations: LocationItem[];
}) {
  return (
    <section id="kontakt" className="section bg-[var(--bg-secondary)]">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="section-title">Opisz problem</h2>
          <p className="section-lead">
            Albo zadzwoń od razu — {site.openingHours}.
          </p>
          <a
            href={telHref(site.phone)}
            className="mt-6 inline-block text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {site.phoneDisplay}
          </a>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{site.email}</p>

          <div className="mt-10">
            <h3 className="text-lg font-semibold">Serwis telefonów Kórnik i okolice</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {locations.map((loc) => (
                <li
                  key={loc.name}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--text-secondary)]"
                >
                  {loc.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ContactForm turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
      </div>
    </section>
  );
}
