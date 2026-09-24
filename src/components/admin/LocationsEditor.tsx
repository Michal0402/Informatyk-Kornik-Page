"use client";

import { useState } from "react";
import type { LocationItem } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";

export function LocationsEditor({ initial }: { initial: LocationItem[] }) {
  const [items, setItems] = useState(initial);
  const [name, setName] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Obszar działania</h1>
      <div className="flex gap-2">
        <input
          className="field"
          placeholder="Nowa miejscowość"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            if (!name.trim()) return;
            setItems((prev) => [...prev, { name: name.trim(), visible: true }]);
            setName("");
          }}
        >
          Dodaj
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={`${item.name}-${i}`} className="card flex items-center justify-between gap-3 p-3">
            <input
              className="field"
              value={item.name}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)),
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
          </li>
        ))}
      </ul>
      <SaveJsonButton file="locations.json" getData={() => items} />
    </div>
  );
}
