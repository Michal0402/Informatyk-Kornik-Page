"use client";

import { useState } from "react";
import type { ServiceItem } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";
import { slugify } from "@/lib/utils";

export function ServicesEditor({ initial }: { initial: ServiceItem[] }) {
  const [items, setItems] = useState(initial);

  function update(i: number, patch: Partial<ServiceItem>) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  function add() {
    setItems((prev) => [
      ...prev,
      {
        id: `usluga-${Date.now()}`,
        title: "Nowa usługa",
        shortDescription: "Opis usługi",
        slug: `nowa-usluga-${Date.now()}`,
        icon: "smartphone",
        visible: true,
        featured: true,
        order: prev.length + 1,
      },
    ]);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Usługi</h1>
        <button type="button" className="btn btn-secondary" onClick={add}>
          Dodaj
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="card grid gap-3 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="text-[var(--text-secondary)]">Tytuł</span>
                <input
                  className="field"
                  value={item.title}
                  onChange={(e) =>
                    update(i, {
                      title: e.target.value,
                      id: slugify(e.target.value) || item.id,
                      slug: `${slugify(e.target.value)}-kornik`,
                    })
                  }
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="text-[var(--text-secondary)]">Ikona</span>
                <input
                  className="field"
                  value={item.icon}
                  onChange={(e) => update(i, { icon: e.target.value })}
                />
              </label>
            </div>
            <label className="grid gap-1 text-sm">
              <span className="text-[var(--text-secondary)]">Opis</span>
              <textarea
                className="field"
                rows={2}
                value={item.shortDescription}
                onChange={(e) => update(i, { shortDescription: e.target.value })}
              />
            </label>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.visible}
                  onChange={(e) => update(i, { visible: e.target.checked })}
                />
                Widoczna
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.featured}
                  onChange={(e) => update(i, { featured: e.target.checked })}
                />
                Wyróżniona
              </label>
              <button
                type="button"
                className="text-red-400"
                onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
              >
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>
      <SaveJsonButton file="services.json" getData={() => items} />
    </div>
  );
}
