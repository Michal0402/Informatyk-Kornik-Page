"use client";

import { useMemo, useState } from "react";
import type { SeoData } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";

export function SeoEditor({ initial }: { initial: SeoData }) {
  const [data, setData] = useState(initial);
  const home = data.home;

  const titleLen = home.title.length;
  const descLen = home.description.length;

  const previewTitle = useMemo(() => home.title.slice(0, 60), [home.title]);
  const previewDesc = useMemo(() => home.description.slice(0, 160), [home.description]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">SEO — strona główna</h1>
      <div className="grid gap-4">
        <label className="grid gap-1 text-sm">
          <span className="text-[var(--text-secondary)]">Title ({titleLen} / 60)</span>
          <input
            className="field"
            value={home.title}
            onChange={(e) =>
              setData({ ...data, home: { ...home, title: e.target.value } })
            }
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-[var(--text-secondary)]">Description ({descLen} / 160)</span>
          <textarea
            className="field"
            rows={3}
            value={home.description}
            onChange={(e) =>
              setData({ ...data, home: { ...home, description: e.target.value } })
            }
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-[var(--text-secondary)]">H1</span>
          <input
            className="field"
            value={home.h1}
            onChange={(e) => setData({ ...data, home: { ...home, h1: e.target.value } })}
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-[var(--text-secondary)]">Canonical</span>
          <input
            className="field"
            value={home.canonical}
            onChange={(e) =>
              setData({ ...data, home: { ...home, canonical: e.target.value } })
            }
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-[var(--text-secondary)]">Open Graph title</span>
          <input
            className="field"
            value={home.ogTitle || ""}
            onChange={(e) =>
              setData({ ...data, home: { ...home, ogTitle: e.target.value } })
            }
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-[var(--text-secondary)]">Open Graph description</span>
          <textarea
            className="field"
            rows={2}
            value={home.ogDescription || ""}
            onChange={(e) =>
              setData({ ...data, home: { ...home, ogDescription: e.target.value } })
            }
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-[var(--text-secondary)]">Open Graph image URL</span>
          <input
            className="field"
            value={home.ogImage || ""}
            onChange={(e) =>
              setData({ ...data, home: { ...home, ogImage: e.target.value } })
            }
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={home.index}
            onChange={(e) =>
              setData({ ...data, home: { ...home, index: e.target.checked } })
            }
          />
          Indeksowanie strony głównej
        </label>
      </div>

      <div className="card p-4">
        <p className="mb-2 text-xs text-[var(--text-muted)]">Podgląd Google</p>
        <p className="text-xl text-[#8ab4f8]">{previewTitle}</p>
        <p className="text-sm text-emerald-500">{home.canonical}</p>
        <p className="text-sm text-[var(--text-secondary)]">{previewDesc}</p>
      </div>

      <SaveJsonButton file="seo.json" getData={() => data} />
    </div>
  );
}
