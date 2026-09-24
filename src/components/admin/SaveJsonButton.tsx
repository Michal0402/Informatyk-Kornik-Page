"use client";

import { useState } from "react";

export function SaveJsonButton({
  file,
  getData,
  label = "Zapisz i opublikuj",
}: {
  file: string;
  getData: () => unknown;
  label?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function save() {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file,
          data: getData(),
          message: `chore(content): update ${file} via admin`,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Błąd zapisu");
      setStatus("ok");
      setMessage(
        json.message ||
          "Zmiany zostały zapisane. Nowa wersja strony zostanie wdrożona automatycznie.",
      );
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Błąd");
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="btn btn-primary"
        onClick={save}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Zapisywanie…" : label}
      </button>
      {message ? (
        <p className={`text-sm ${status === "ok" ? "text-emerald-400" : "text-red-400"}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
