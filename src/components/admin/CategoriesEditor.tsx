"use client";

import { useState } from "react";
import type { CategoryItem } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";
import { slugify } from "@/lib/utils";

export function CategoriesEditor({ initial }: { initial: CategoryItem[] }) {
  const [items, setItems] = useState(initial);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Kategorie</h1>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            setItems((prev) => [
              ...prev,
              {
                id: `kat-${Date.now()}`,
                name: "Nowa",
                slug: `nowa-${Date.now()}`,
                visible: true,
                order: prev.length,
              },
            ])
          }
        >
          Dodaj
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={item.id} className="card flex flex-wrap items-center gap-3 p-3">
            <input
              className="field max-w-xs"
              value={item.name}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((x, idx) =>
                    idx === i
                      ? {
                          ...x,
                          name: e.target.value,
                          slug: slugify(e.target.value),
                          id: slugify(e.target.value) || x.id,
                        }
                      : x,
                  ),
                )
              }
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.visible}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((x, idx) =>
                      idx === i ? { ...x, visible: e.target.checked } : x,
                    ),
                  )
                }
              />
              Widoczna
            </label>
            <button
              type="button"
              className="text-sm text-red-400"
              onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
            >
              Usuń
            </button>
          </div>
        ))}
      </div>
      <SaveJsonButton file="categories.json" getData={() => items} />
    </div>
  );
}
