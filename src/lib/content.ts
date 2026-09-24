import { cache } from "react";
import type {
  AppearanceData,
  CategoryItem,
  FaqItem,
  HeroData,
  LocationItem,
  PriceItem,
  ProjectItem,
  RobotsData,
  SeoData,
  ServiceItem,
  SiteData,
} from "@/types/content";

import site from "@/content/site.json";
import hero from "@/content/hero.json";
import services from "@/content/services.json";
import prices from "@/content/prices.json";
import projects from "@/content/projects.json";
import categories from "@/content/categories.json";
import faq from "@/content/faq.json";
import locations from "@/content/locations.json";
import seo from "@/content/seo.json";
import robots from "@/content/robots.json";
import appearance from "@/content/appearance.json";
import brands from "@/content/brands.json";

export const getSite = cache(async (): Promise<SiteData> => site as SiteData);
export const getHero = cache(async (): Promise<HeroData> => hero as HeroData);
export const getServices = cache(
  async (): Promise<ServiceItem[]> =>
    [...(services as ServiceItem[])].sort((a, b) => a.order - b.order),
);
export const getPrices = cache(
  async (): Promise<PriceItem[]> =>
    [...(prices as PriceItem[])].sort((a, b) => a.order - b.order),
);
export const getProjects = cache(
  async (): Promise<ProjectItem[]> => projects as ProjectItem[],
);
export const getCategories = cache(
  async (): Promise<CategoryItem[]> =>
    [...(categories as CategoryItem[])].sort((a, b) => a.order - b.order),
);
export const getFaq = cache(
  async (): Promise<FaqItem[]> =>
    [...(faq as FaqItem[])].sort((a, b) => a.order - b.order),
);
export const getLocations = cache(
  async (): Promise<LocationItem[]> => locations as LocationItem[],
);
export const getSeo = cache(async (): Promise<SeoData> => seo as SeoData);
export const getRobots = cache(
  async (): Promise<RobotsData> => robots as RobotsData,
);
export const getAppearance = cache(
  async (): Promise<AppearanceData> => appearance as AppearanceData,
);
export const getBrands = cache(async (): Promise<string[]> => brands as string[]);

export async function getVisibleServices() {
  return (await getServices()).filter((s) => s.visible);
}

export async function getVisiblePrices() {
  return (await getPrices()).filter((p) => p.visible);
}

export async function getVisibleProjects() {
  return (await getProjects()).filter((p) => p.visible);
}

export async function getVisibleFaq() {
  return (await getFaq()).filter((f) => f.visible);
}

export async function getVisibleLocations() {
  return (await getLocations()).filter((l) => l.visible);
}

export async function getAllContent() {
  const [
    siteData,
    heroData,
    servicesData,
    pricesData,
    projectsData,
    categoriesData,
    faqData,
    locationsData,
    seoData,
    robotsData,
    appearanceData,
    brandsData,
  ] = await Promise.all([
    getSite(),
    getHero(),
    getServices(),
    getPrices(),
    getProjects(),
    getCategories(),
    getFaq(),
    getLocations(),
    getSeo(),
    getRobots(),
    getAppearance(),
    getBrands(),
  ]);

  return {
    site: siteData,
    hero: heroData,
    services: servicesData,
    prices: pricesData,
    projects: projectsData,
    categories: categoriesData,
    faq: faqData,
    locations: locationsData,
    seo: seoData,
    robots: robotsData,
    appearance: appearanceData,
    brands: brandsData,
  };
}
