"use client";

import { useState } from "react";
import type { SiteData } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";

export function SiteEditor({ initial }: { initial: SiteData }) {
  const [data, setData] = useState(initial);

  function set<K extends keyof SiteData>(key: K, value: SiteData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  const fields: { key: keyof SiteData; label: string }[] = [
    { key: "companyName", label: "Pełna nazwa firmy" },
    { key: "companyShortName", label: "Krótka nazwa" },
    { key: "domain", label: "Domena" },
    { key: "phone", label: "Telefon (E.164)" },
    { key: "phoneDisplay", label: "Telefon (wyświetlany)" },
    { key: "phoneSecondary", label: "Drugi telefon" },
    { key: "email", label: "E-mail" },
    { key: "street", label: "Ulica" },
    { key: "postalCode", label: "Kod pocztowy" },
    { key: "city", label: "Miasto" },
    { key: "openingHours", label: "Godziny / kontakt" },
    { key: "serviceArea", label: "Obszar działania" },
    { key: "facebook", label: "Facebook" },
    { key: "instagram", label: "Instagram" },
    { key: "messenger", label: "Messenger" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "googleMaps", label: "Google Maps" },
    { key: "googleBusiness", label: "Google Business Profile" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dane firmy</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Zmiana nazwy i telefonu aktualizuje navbar, stopkę, Schema.org i CTA.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map(({ key, label }) => (
          <label key={key} className="grid gap-1.5 text-sm">
            <span className="text-[var(--text-secondary)]">{label}</span>
            <input
              className="field"
              value={data[key] || ""}
              onChange={(e) => set(key, e.target.value)}
            />
          </label>
        ))}
      </div>
      <SaveJsonButton file="site.json" getData={() => data} />
    </div>
  );
}
