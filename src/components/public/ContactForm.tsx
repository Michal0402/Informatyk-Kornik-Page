"use client";

import { useState } from "react";

const PROBLEMS = [
  "Wyświetlacz",
  "Bateria",
  "Tylna szybka",
  "Aparat",
  "Ładowanie",
  "Telefon nie uruchamia się",
  "Inny problem",
] as const;

export function ContactForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Nie udało się wysłać zgłoszenia.");
      }
      setStatus("ok");
      setMessage("Zgłoszenie wysłane. Oddzwonimy najszybciej jak to możliwe.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Wystąpił błąd.");
    }
  }

  return (
    <form className="card grid gap-4 p-5 md:p-6" onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Imię" name="name" required autoComplete="given-name" />
        <Field label="Telefon" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Marka" name="brand" required placeholder="np. Apple" />
        <Field label="Model" name="model" required placeholder="np. iPhone 13" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="problemType" className="text-sm text-[var(--text-secondary)]">
          Rodzaj problemu
        </label>
        <select
          id="problemType"
          name="problemType"
          required
          className="field"
          defaultValue=""
        >
          <option value="" disabled>
            Wybierz…
          </option>
          {PROBLEMS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="description" className="text-sm text-[var(--text-secondary)]">
          Opis
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          minLength={10}
          className="field"
          placeholder="Co się dzieje z telefonem?"
        />
      </div>
      <Field
        label="E-mail (opcjonalnie)"
        name="email"
        type="email"
        autoComplete="email"
      />
      {turnstileSiteKey ? (
        <div
          className="cf-turnstile"
          data-sitekey={turnstileSiteKey}
          data-theme="dark"
        />
      ) : null}
      <input type="hidden" name="turnstileToken" value="" />
      <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
        {status === "loading" ? "Wysyłanie…" : "Wyślij zgłoszenie"}
      </button>
      {message ? (
        <p
          role="status"
          className={`text-sm ${status === "ok" ? "text-emerald-400" : "text-red-400"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm text-[var(--text-secondary)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="field"
      />
    </div>
  );
}
