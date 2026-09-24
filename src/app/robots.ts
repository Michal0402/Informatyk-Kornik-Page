import { getRobots } from "@/lib/content";
import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const data = await getRobots();

  if (!data.allowIndexing) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: data.allowAllBots ? "*" : "*",
      allow: "/",
      disallow: data.disallow.length ? data.disallow : ["/admin/", "/api/"],
    },
    sitemap: data.sitemap,
  };
}
