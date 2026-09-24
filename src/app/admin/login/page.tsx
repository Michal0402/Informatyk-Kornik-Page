"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Błąd logowania");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Błąd");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center">
      <h1 className="text-2xl font-semibold">Logowanie</h1>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">Panel administratora</p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <label className="grid gap-1 text-sm">
          <span>E-mail</span>
          <input
            className="field"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Hasło</span>
          <input
            className="field"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Logowanie…" : "Zaloguj"}
        </button>
      </form>
    </div>
  );
}
