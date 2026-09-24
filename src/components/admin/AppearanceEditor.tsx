"use client";

import { useState } from "react";
import type { AppearanceData } from "@/types/content";
import { SaveJsonButton } from "./SaveJsonButton";

export function AppearanceEditor({ initial }: { initial: AppearanceData }) {
  const [data, setData] = useState(initial);
  const [uploading, setUploading] = useState(false);

  async function upload(kind: "logo" | "favicon", file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const json = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error || "Upload failed");
      setData((prev) => ({ ...prev, [kind]: json.url }));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Błąd");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Wygląd</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {(
          [
            ["accentColor", "Akcent"],
            ["backgroundColor", "Tło"],
            ["surfaceColor", "Karty"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="grid gap-1 text-sm">
            <span className="text-[var(--text-secondary)]">{label}</span>
            <input
              type="color"
              className="h-12 w-full rounded-xl border border-[var(--border)] bg-transparent"
              value={data[key]}
              onChange={(e) => setData({ ...data, [key]: e.target.value })}
            />
            <input
              className="field"
              value={data[key]}
              onChange={(e) => setData({ ...data, [key]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <label className="btn btn-secondary cursor-pointer">
          {uploading ? "Wgrywanie…" : "Logo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload("logo", f);
            }}
          />
        </label>
        <label className="btn btn-secondary cursor-pointer">
          Favicon
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload("favicon", f);
            }}
          />
        </label>
      </div>
      <SaveJsonButton file="appearance.json" getData={() => data} />
    </div>
  );
}
