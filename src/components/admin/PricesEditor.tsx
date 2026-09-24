"use client";

import { useState } from "react";
import type { PriceItem, PriceType } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";
import { slugify } from "@/lib/utils";

export function PricesEditor({ initial }: { initial: PriceItem[] }) {
  const [items, setItems] = useState(initial);

  function update(i: number, patch: Partial<PriceItem>) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  function add() {
    setItems((prev) => [
      ...prev,
      {
        id: `cena-${Date.now()}`,
        name: "Nowa pozycja",
        priceType: "from",
        price: "0",
        currency: "PLN",
        visible: true,
        order: prev.length + 1,
      },
    ]);
  }

  function remove(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next.map((item, idx) => ({ ...item, order: idx + 1 }));
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Cennik</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Typy: fixed, from, quote, contact.
          </p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={add}>
          Dodaj pozycję
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="card grid gap-3 p-4 md:grid-cols-6">
            <label className="grid gap-1 text-sm md:col-span-2">
              <span className="text-[var(--text-secondary)]">Nazwa</span>
              <input
                className="field"
                value={item.name}
                onChange={(e) =>
                  update(i, { name: e.target.value, id: slugify(e.target.value) || item.id })
                }
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-[var(--text-secondary)]">Typ</span>
              <select
                className="field"
                value={item.priceType}
                onChange={(e) => update(i, { priceType: e.target.value as PriceType })}
              >
                <option value="fixed">fixed</option>
                <option value="from">from (od)</option>
                <option value="quote">quote (Wycena)</option>
                <option value="contact">contact (Zapytaj)</option>
              </select>
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-[var(--text-secondary)]">Cena</span>
              <input
                className="field"
                value={item.price}
                onChange={(e) => update(i, { price: e.target.value })}
                disabled={item.priceType === "quote" || item.priceType === "contact"}
              />
            </label>
            <label className="flex items-end gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.visible}
                onChange={(e) => update(i, { visible: e.target.checked })}
              />
              Widoczna
            </label>
            <div className="flex items-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => move(i, -1)}>
                ↑
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => move(i, 1)}>
                ↓
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => remove(i)}>
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>
      <SaveJsonButton file="prices.json" getData={() => items} />
    </div>
  );
}
