"use client";

import { useState } from "react";
import type { HeroData } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";

export function HeroEditor({ initial }: { initial: HeroData }) {
  const [data, setData] = useState(initial);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Strona główna — Hero</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Edycja treści sekcji hero.</p>
      </div>
      <div className="grid gap-4">
        {(
          [
            ["badge", "Badge"],
            ["title", "Tytuł H1"],
            ["subtitle", "Podtytuł"],
            ["description", "Opis"],
            ["primaryCta", "CTA główne"],
            ["secondaryCta", "CTA drugie"],
            ["note", "Notatka"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="grid gap-1.5 text-sm">
            <span className="text-[var(--text-secondary)]">{label}</span>
            {key === "description" ? (
              <textarea
                className="field"
                rows={4}
                value={data[key]}
                onChange={(e) => setData({ ...data, [key]: e.target.value })}
              />
            ) : (
              <input
                className="field"
                value={data[key]}
                onChange={(e) => setData({ ...data, [key]: e.target.value })}
              />
            )}
          </label>
        ))}
      </div>
      <SaveJsonButton file="hero.json" getData={() => data} />
    </div>
  );
}
