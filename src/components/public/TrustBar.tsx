import { Clock, MapPin, Package, Wallet } from "lucide-react";

const ITEMS = [
  {
    icon: Clock,
    title: "Kontakt 24/7",
    text: "Możliwość kontaktu przez całą dobę.",
  },
  {
    icon: Package,
    title: "Odbiór urządzenia",
    text: "Możliwy odbiór telefonu od klienta.",
  },
  {
    icon: MapPin,
    title: "Lokalnie",
    text: "Kórnik i okolice.",
  },
  {
    icon: Wallet,
    title: "Wycena",
    text: "Koszt większych napraw ustalany przed wykonaniem prac.",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-secondary)] py-8">
      <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden />
            </div>
            <div>
              <p className="font-medium">{title}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
