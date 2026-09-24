import type { MetadataRoute } from "next";
import { getAppearance, getSite } from "@/lib/content";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const [site, appearance] = await Promise.all([getSite(), getAppearance()]);
  return {
    name: site.companyName,
    short_name: site.companyShortName,
    description: `Serwis telefonów — ${site.serviceArea}`,
    start_url: "/",
    display: "standalone",
    background_color: appearance.backgroundColor,
    theme_color: appearance.backgroundColor,
    lang: "pl",
  };
}
