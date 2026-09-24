import {
  Battery,
  Camera,
  Plug,
  Search,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { ServiceItem } from "@/types/content";

const ICONS: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  battery: Battery,
  shield: Shield,
  camera: Camera,
  plug: Plug,
  search: Search,
};

export function Services({ services }: { services: ServiceItem[] }) {
  return (
    <section id="uslugi" className="section">
      <div className="container-page">
        <h2 className="section-title">Główne usługi</h2>
        <p className="section-lead">
          Najczęstsze naprawy telefonów — od wyświetlacza po diagnostykę.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.icon] || Smartphone;
            return (
              <article
                key={service.id}
                className="card p-5 transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                  <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden />
                </div>
                <h3 className="m-0 text-lg font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {service.shortDescription}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
