export type PriceType = "fixed" | "from" | "quote" | "contact";

export interface SiteData {
  companyName: string;
  companyShortName: string;
  domain: string;
  phone: string;
  phoneDisplay: string;
  phoneSecondary: string;
  email: string;
  street: string;
  postalCode: string;
  city: string;
  openingHours: string;
  serviceArea: string;
  facebook: string;
  instagram: string;
  messenger: string;
  whatsapp: string;
  googleMaps: string;
  googleBusiness: string;
}

export interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  note: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  icon: string;
  visible: boolean;
  featured: boolean;
  order: number;
}

export interface PriceItem {
  id: string;
  name: string;
  priceType: PriceType;
  price: string;
  currency: string;
  visible: boolean;
  order: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  visible: boolean;
  order: number;
}

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface ProjectItem {
  id: string;
  brand: string;
  model: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  images: ProjectImage[];
  location: string;
  date: string;
  visible: boolean;
  featured: boolean;
  slug: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  visible: boolean;
  order: number;
}

export interface LocationItem {
  name: string;
  visible: boolean;
}

export interface SeoPage {
  title: string;
  description: string;
  h1: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  index: boolean;
}

export interface SeoData {
  home: SeoPage;
  pages: Record<string, SeoPage>;
}

export interface RobotsData {
  allowIndexing: boolean;
  allowAllBots: boolean;
  disallow: string[];
  sitemap: string;
}

export interface AppearanceData {
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  logo: string;
  favicon: string;
}

export type ContentFile =
  | "site.json"
  | "hero.json"
  | "services.json"
  | "prices.json"
  | "projects.json"
  | "categories.json"
  | "faq.json"
  | "locations.json"
  | "seo.json"
  | "robots.json"
  | "appearance.json"
  | "brands.json";
