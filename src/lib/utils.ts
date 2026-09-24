import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PriceItem } from "@/types/content";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(item: PriceItem): string {
  switch (item.priceType) {
    case "fixed":
      return `${item.price} zł`;
    case "from":
      return `od ${item.price} zł`;
    case "quote":
      return "Wycena";
    case "contact":
      return "Zapytaj";
    default:
      return "Zapytaj";
  }
}

export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
