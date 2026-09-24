"use client";

import { useState } from "react";
import type { RobotsData } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";

export function RobotsEditor({ initial }: { initial: RobotsData }) {
  const [data, setData] = useState(initial);
  const [path, setPath] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Robots.txt</h1>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={data.allowIndexing}
          onChange={(e) => setData({ ...data, allowIndexing: e.target.checked })}
        />
        Zezwalaj wyszukiwarkom na indeksowanie strony
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={data.allowAllBots}
          onChange={(e) => setData({ ...data, allowAllBots: e.target.checked })}
        />
        Zezwalaj wszystkim robotom
      </label>
      <label className="grid gap-1 text-sm">
        <span className="text-[var(--text-secondary)]">Sitemap URL</span>
        <input
          className="field"
          value={data.sitemap}
          onChange={(e) => setData({ ...data, sitemap: e.target.value })}
        />
      </label>
      <div>
        <p className="mb-2 text-sm text-[var(--text-secondary)]">Disallow</p>
        <ul className="mb-3 space-y-2">
          {data.disallow.map((d, i) => (
            <li key={`${d}-${i}`} className="flex gap-2">
              <input
                className="field"
                value={d}
                onChange={(e) =>
                  setData({
                    ...data,
                    disallow: data.disallow.map((x, idx) =>
                      idx === i ? e.target.value : x,
                    ),
                  })
                }
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  setData({
                    ...data,
                    disallow: data.disallow.filter((_, idx) => idx !== i),
                  })
                }
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            className="field"
            placeholder="/admin/"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (!path.trim()) return;
              setData({ ...data, disallow: [...data.disallow, path.trim()] });
              setPath("");
            }}
          >
            Dodaj
          </button>
        </div>
      </div>
      <SaveJsonButton file="robots.json" getData={() => data} />
    </div>
  );
}
