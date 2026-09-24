import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Podaj imię").max(80),
  phone: z.string().min(9, "Podaj numer telefonu").max(30),
  brand: z.string().min(1, "Wybierz markę").max(60),
  model: z.string().min(1, "Podaj model").max(80),
  problemType: z.enum([
    "Wyświetlacz",
    "Bateria",
    "Tylna szybka",
    "Aparat",
    "Ładowanie",
    "Telefon nie uruchamia się",
    "Inny problem",
  ]),
  description: z.string().min(10, "Opisz problem (min. 10 znaków)").max(2000),
  email: z.string().email("Nieprawidłowy e-mail").optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export const siteSchema = z.object({
  companyName: z.string().min(2).max(120),
  companyShortName: z.string().min(2).max(80),
  domain: z.string().url(),
  phone: z.string().min(5).max(30),
  phoneDisplay: z.string().min(5).max(40),
  phoneSecondary: z.string().max(30).optional().default(""),
  email: z.string().email(),
  street: z.string().max(120).optional().default(""),
  postalCode: z.string().max(20).optional().default(""),
  city: z.string().min(2).max(80),
  openingHours: z.string().min(2).max(120),
  serviceArea: z.string().min(2).max(120),
  facebook: z.string().max(200).optional().default(""),
  instagram: z.string().max(200).optional().default(""),
  messenger: z.string().max(200).optional().default(""),
  whatsapp: z.string().max(200).optional().default(""),
  googleMaps: z.string().max(500).optional().default(""),
  googleBusiness: z.string().max(500).optional().default(""),
});

export const heroSchema = z.object({
  badge: z.string().min(2).max(80),
  title: z.string().min(2).max(120),
  subtitle: z.string().min(2).max(200),
  description: z.string().min(10).max(500),
  primaryCta: z.string().min(2).max(40),
  secondaryCta: z.string().min(2).max(40),
  note: z.string().min(2).max(120),
});

export const priceTypeSchema = z.enum(["fixed", "from", "quote", "contact"]);

export const priceItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  priceType: priceTypeSchema,
  price: z.string(),
  currency: z.string().default("PLN"),
  visible: z.boolean(),
  order: z.number().int(),
});

export const serviceItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  shortDescription: z.string().min(5),
  slug: z.string().min(2),
  icon: z.string().min(1),
  visible: z.boolean(),
  featured: z.boolean(),
  order: z.number().int(),
});

export const faqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(5),
  answer: z.string().min(5),
  visible: z.boolean(),
  order: z.number().int(),
});

export const locationItemSchema = z.object({
  name: z.string().min(1),
  visible: z.boolean(),
});

export const robotsSchema = z.object({
  allowIndexing: z.boolean(),
  allowAllBots: z.boolean(),
  disallow: z.array(z.string()),
  sitemap: z.string().url(),
});

export const appearanceSchema = z.object({
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  surfaceColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  logo: z.string().optional().default(""),
  favicon: z.string().optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
