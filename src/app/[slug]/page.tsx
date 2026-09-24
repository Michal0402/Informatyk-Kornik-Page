import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { MobileCallBar } from "@/components/public/MobileCallBar";
import { FinalCta } from "@/components/public/FinalCta";
import { Faq } from "@/components/public/Faq";
import {
  getAppearance,
  getSeo,
  getSite,
  getVisibleFaq,
  getVisibleProjects,
  getVisibleServices,
} from "@/lib/content";
import { telHref } from "@/lib/utils";

const SLUGS = [
  "naprawa-telefonow-kornik",
  "serwis-iphone-kornik",
  "naprawa-samsung-kornik",
  "naprawa-xiaomi-kornik",
  "wymiana-wyswietlacza-kornik",
  "wymiana-baterii-kornik",
  "wymiana-tylnej-szybki-kornik",
  "naprawa-gniazda-ladowania-kornik",
] as const;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = await getSeo();
  const page = seo.pages[slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.canonical },
    robots: page.index ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as (typeof SLUGS)[number])) notFound();

  const [site, seo, appearance, faq, services, projects] = await Promise.all([
    getSite(),
    getSeo(),
    getAppearance(),
    getVisibleFaq(),
    getVisibleServices(),
    getVisibleProjects(),
  ]);
  const page = seo.pages[slug];
  if (!page) notFound();

  const related = projects.filter((p) => p.visible).slice(0, 3);
  const relatedService = services.find((s) => s.slug === slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: site.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.h1,
        item: page.canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar
        companyName={site.companyShortName}
        phone={site.phone}
        phoneDisplay={site.phoneDisplay}
        logo={appearance.logo}
      />
      <main className="mobile-cta-pad">
        <section className="section">
          <div className="container-page">
            <nav className="mb-6 text-sm text-[var(--text-muted)]" aria-label="Breadcrumb">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link href="/" className="hover:text-[var(--text)]">
                    Strona główna
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-[var(--text-secondary)]">{page.h1}</li>
              </ol>
            </nav>
            <h1 className="m-0 text-[clamp(1.875rem,4vw,2.75rem)] font-semibold tracking-tight">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">{page.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={telHref(site.phone)} className="btn btn-primary">
                Zadzwoń: {site.phoneDisplay}
              </a>
              <Link href="/#kontakt" className="btn btn-secondary">
                Wyślij zgłoszenie
              </Link>
            </div>
            {relatedService ? (
              <p className="mt-6 text-sm text-[var(--text-muted)]">
                {relatedService.shortDescription}
              </p>
            ) : null}
          </div>
        </section>

        {related.length ? (
          <section className="section pt-0">
            <div className="container-page">
              <h2 className="section-title">Powiązane realizacje</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((p) => (
                  <article key={p.id} className="card p-4">
                    <p className="text-xs text-[var(--text-muted)]">
                      {p.brand} {p.model}
                    </p>
                    <h3 className="mt-1 font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">{p.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <Faq items={faq.slice(0, 5)} />
        <FinalCta site={site} />
      </main>
      <Footer site={site} />
      <MobileCallBar phone={site.phone} phoneDisplay={site.phoneDisplay} />
    </>
  );
}
