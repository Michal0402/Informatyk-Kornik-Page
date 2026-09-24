import type { PriceItem } from "@/types/content";
import { formatPrice } from "@/lib/utils";

export function Pricing({ prices }: { prices: PriceItem[] }) {
  return (
    <section id="cennik" className="section">
      <div className="container-page">
        <h2 className="section-title">Orientacyjny cennik</h2>
        <p className="section-lead">
          Ceny zależą od modelu telefonu. Przy większych naprawach koszt ustalamy przed pracą.
        </p>
        <div className="card mt-10 overflow-hidden">
          <ul className="divide-y divide-[var(--border)]">
            {prices.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 px-5 py-4 text-sm md:text-base"
              >
                <span>{item.name}</span>
                <span className="shrink-0 font-semibold text-[var(--text)]">
                  {formatPrice(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
