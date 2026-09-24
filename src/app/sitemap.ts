import type { MetadataRoute } from "next";
import { getSeo, getSite, getVisibleProjects, getVisibleServices } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, seo, services, projects] = await Promise.all([
    getSite(),
    getSeo(),
    getVisibleServices(),
    getVisibleProjects(),
  ]);

  const entries: MetadataRoute.Sitemap = [
    {
      url: site.domain,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const [slug, page] of Object.entries(seo.pages)) {
    if (!page.index) continue;
    entries.push({
      url: page.canonical || `${site.domain}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const service of services) {
    if (!service.slug) continue;
    const already = entries.some((e) => e.url.endsWith(`/${service.slug}`));
    if (already) continue;
    entries.push({
      url: `${site.domain}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const project of projects) {
    if (!project.visible || !project.slug) continue;
    entries.push({
      url: `${site.domain}/realizacje/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
