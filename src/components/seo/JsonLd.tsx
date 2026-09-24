import type { FaqItem, ServiceItem, SiteData } from "@/types/content";

export function JsonLd({
  site,
  faq,
  services,
}: {
  site: SiteData;
  faq: FaqItem[];
  services: ServiceItem[];
}) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "MobilePhoneStore",
    name: site.companyName,
    url: site.domain,
    telephone: site.phone,
    email: site.email,
    image: site.googleBusiness || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street || undefined,
      postalCode: site.postalCode || undefined,
      addressLocality: site.city,
      addressCountry: "PL",
    },
    areaServed: site.serviceArea,
    openingHours: site.openingHours,
    sameAs: [site.facebook, site.instagram, site.googleBusiness].filter(Boolean),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.companyName,
    url: site.domain,
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.shortDescription,
        provider: { "@type": "LocalBusiness", name: site.companyName },
        areaServed: site.serviceArea,
        url: `${site.domain}/${s.slug}`,
      },
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
