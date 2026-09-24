import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { getAppearance, getSeo, getSite } from "@/lib/content";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [site, seo, appearance] = await Promise.all([
    getSite(),
    getSeo(),
    getAppearance(),
  ]);
  const home = seo.home;
  return {
    metadataBase: new URL(site.domain),
    title: {
      default: home.title,
      template: `%s | ${site.companyShortName}`,
    },
    description: home.description,
    alternates: { canonical: home.canonical },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: home.canonical,
      siteName: site.companyName,
      title: home.ogTitle || home.title,
      description: home.ogDescription || home.description,
      ...(home.ogImage || appearance.logo
        ? { images: [{ url: home.ogImage || appearance.logo }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: home.ogTitle || home.title,
      description: home.ogDescription || home.description,
    },
    robots: home.index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    icons: appearance.favicon
      ? { icon: appearance.favicon }
      : { icon: "/favicon.ico" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const appearance = await getAppearance();

  return (
    <html lang="pl">
      <body
        className={`${inter.variable} font-sans antialiased`}
        style={
          {
            "--accent": appearance.accentColor,
            "--accent-hover": "#2563EB",
            "--bg": appearance.backgroundColor,
            "--bg-secondary": "#0D1015",
            "--surface": appearance.surfaceColor,
            "--surface-hover": "#151A22",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
