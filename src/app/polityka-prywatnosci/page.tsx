import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  robots: { index: true, follow: true },
};

export default async function PrivacyPage() {
  const site = await getSite();
  return (
    <main className="section">
      <div className="container-page max-w-3xl">
        <Link href="/" className="text-sm text-[var(--accent)]">
          ← Wróć
        </Link>
        <h1 className="mt-4 text-3xl font-semibold">Polityka prywatności</h1>
        <div className="mt-6 space-y-4 text-[var(--text-secondary)]">
          <p>
            Administratorem danych jest {site.companyName}. Kontakt:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>, tel. {site.phoneDisplay}.
          </p>
          <p>
            Formularz kontaktowy przekazuje dane (imię, telefon, opis usterki, opcjonalnie
            e-mail) wyłącznie w celu odpowiedzi na zapytanie. Zgłoszenia nie są zapisywane w
            bazie danych — wysyłane są e-mailem (Resend).
          </p>
          <p>
            Możemy stosować Cloudflare Turnstile (antyspam) oraz narzędzia hostingowe. Masz
            prawo dostępu, sprostowania, usunięcia danych oraz skargi do UODO.
          </p>
        </div>
      </div>
    </main>
  );
}
