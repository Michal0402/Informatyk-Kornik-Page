"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";
import { slugify } from "@/lib/utils";

export function FaqEditor({ initial }: { initial: FaqItem[] }) {
  const [items, setItems] = useState(initial);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">FAQ</h1>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            setItems((prev) => [
              ...prev,
              {
                id: `faq-${Date.now()}`,
                question: "Nowe pytanie?",
                answer: "Odpowiedź",
                visible: true,
                order: prev.length + 1,
              },
            ])
          }
        >
          Dodaj
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="card space-y-3 p-4">
            <input
              className="field"
              value={item.question}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((x, idx) =>
                    idx === i
                      ? {
                          ...x,
                          question: e.target.value,
                          id: slugify(e.target.value) || x.id,
                        }
                      : x,
                  ),
                )
              }
            />
            <textarea
              className="field"
              rows={3}
              value={item.answer}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((x, idx) =>
                    idx === i ? { ...x, answer: e.target.value } : x,
                  ),
                )
              }
            />
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2">
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
                Widoczne
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
      <SaveJsonButton file="faq.json" getData={() => items} />
    </div>
  );
}
