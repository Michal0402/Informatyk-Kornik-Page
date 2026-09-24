"use client";

import { useState } from "react";
import type { ProjectItem } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";
import { slugify } from "@/lib/utils";

export function ProjectsEditor({
  initial,
  categories,
}: {
  initial: ProjectItem[];
  categories: { id: string; name: string }[];
}) {
  const [items, setItems] = useState(initial);
  const [uploading, setUploading] = useState<string | null>(null);

  function update(i: number, patch: Partial<ProjectItem>) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  function add() {
    setItems((prev) => [
      ...prev,
      {
        id: `projekt-${Date.now()}`,
        brand: "Apple",
        model: "",
        title: "Nowa naprawa",
        category: "pozostale",
        description: "",
        coverImage: "",
        images: [],
        location: "Kórnik",
        date: new Date().toISOString().slice(0, 10),
        visible: false,
        featured: false,
        slug: "",
      },
    ]);
  }

  async function upload(i: number, file: File) {
    setUploading(items[i].id);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const json = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error || "Upload failed");
      update(i, {
        coverImage: json.url,
        images: [...items[i].images, { url: json.url, alt: `${items[i].brand} ${items[i].model}` }],
      });
    } catch (e) {
      alert(e instanceof Error ? e.message : "Błąd uploadu");
    } finally {
      setUploading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Realizacje</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Tylko prawdziwe zdjęcia (Cloudinary). Domyślnie ukryte do publikacji.
          </p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={add}>
          Dodaj realizację
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="card space-y-3 p-4">
            <div className="grid gap-3 md:grid-cols-3">
              <label className="grid gap-1 text-sm">
                <span className="text-[var(--text-secondary)]">Marka</span>
                <input
                  className="field"
                  value={item.brand}
                  onChange={(e) => update(i, { brand: e.target.value })}
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="text-[var(--text-secondary)]">Model</span>
                <input
                  className="field"
                  value={item.model}
                  onChange={(e) =>
                    update(i, {
                      model: e.target.value,
                      slug: slugify(`${item.brand}-${e.target.value}-${item.title}`),
                    })
                  }
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="text-[var(--text-secondary)]">Kategoria</span>
                <select
                  className="field"
                  value={item.category}
                  onChange={(e) => update(i, { category: e.target.value })}
                >
                  {categories
                    .filter((c) => c.id !== "wszystkie")
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <label className="grid gap-1 text-sm">
              <span className="text-[var(--text-secondary)]">Tytuł</span>
              <input
                className="field"
                value={item.title}
                onChange={(e) => update(i, { title: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-[var(--text-secondary)]">Opis</span>
              <textarea
                className="field"
                rows={2}
                value={item.description}
                onChange={(e) => update(i, { description: e.target.value })}
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <label className="btn btn-secondary cursor-pointer">
                {uploading === item.id ? "Wgrywanie…" : "Dodaj zdjęcie"}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void upload(i, f);
                  }}
                />
              </label>
              {item.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.coverImage}
                  alt=""
                  className="h-16 w-16 rounded-lg object-cover"
                />
              ) : null}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={item.visible}
                  onChange={(e) => update(i, { visible: e.target.checked })}
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
          </div>
        ))}
      </div>
      <SaveJsonButton file="projects.json" getData={() => items} />
    </div>
  );
}
