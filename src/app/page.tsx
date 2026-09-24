import { Navbar } from "@/components/public/Navbar";
import { Hero } from "@/components/public/Hero";
import { TrustBar } from "@/components/public/TrustBar";
import { Services } from "@/components/public/Services";
import { Brands } from "@/components/public/Brands";
import { PickupProcess } from "@/components/public/PickupProcess";
import { Pricing } from "@/components/public/Pricing";
import { Projects } from "@/components/public/Projects";
import { ContactSection } from "@/components/public/ContactSection";
import { Faq } from "@/components/public/Faq";
import { FinalCta } from "@/components/public/FinalCta";
import { Footer } from "@/components/public/Footer";
import { MobileCallBar } from "@/components/public/MobileCallBar";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllContent,
  getVisibleFaq,
  getVisibleLocations,
  getVisiblePrices,
  getVisibleProjects,
  getVisibleServices,
} from "@/lib/content";

export default async function HomePage() {
  const content = await getAllContent();
  const services = await getVisibleServices();
  const prices = await getVisiblePrices();
  const projects = await getVisibleProjects();
  const faq = await getVisibleFaq();
  const locations = await getVisibleLocations();
  const featuredServices = services.filter((s) => s.featured).slice(0, 6);

  return (
    <>
      <JsonLd site={content.site} faq={faq} services={featuredServices} />
      <Navbar
        companyName={content.site.companyShortName}
        phone={content.site.phone}
        phoneDisplay={content.site.phoneDisplay}
        logo={content.appearance.logo}
      />
      <main className="mobile-cta-pad">
        <Hero hero={content.hero} site={content.site} />
        <TrustBar />
        <Services services={featuredServices} />
        <Brands brands={content.brands} />
        <PickupProcess />
        <Pricing prices={prices} />
        <Projects projects={projects} categories={content.categories} />
        <ContactSection site={content.site} locations={locations} />
        <Faq items={faq} />
        <FinalCta site={content.site} />
      </main>
      <Footer site={content.site} />
      <MobileCallBar
        phone={content.site.phone}
        phoneDisplay={content.site.phoneDisplay}
      />
    </>
  );
}
