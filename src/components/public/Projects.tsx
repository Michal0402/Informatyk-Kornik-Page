"use client";

import { useMemo, useState } from "react";
import type { CategoryItem, ProjectItem } from "@/types/content";

export function Projects({
  projects,
  categories,
}: {
  projects: ProjectItem[];
  categories: CategoryItem[];
}) {
  const visibleCats = categories.filter((c) => c.visible);
  const [active, setActive] = useState(visibleCats[0]?.id || "wszystkie");

  const filtered = useMemo(() => {
    if (active === "wszystkie") return projects;
    return projects.filter(
      (p) =>
        p.category === active ||
        p.brand.toLowerCase().includes(active) ||
        p.category.includes(active),
    );
  }, [active, projects]);

  return (
    <section id="realizacje" className="section bg-[var(--bg-secondary)]">
      <div className="container-page">
        <h2 className="section-title">Ostatnie naprawy</h2>
        <p className="section-lead">
          Pokazujemy wyłącznie prawdziwe realizacje — bez stockowych zdjęć i grafik AI.
        </p>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Kategorie">
          {visibleCats.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active === cat.id}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                active === cat.id
                  ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--text)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
              }`}
              onClick={() => setActive(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-8 text-center text-[var(--text-secondary)]">
            Realizacje pojawią się tutaj po dodaniu zdjęć w panelu administratora.
          </p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <article key={project.id} className="card overflow-hidden">
                {project.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.coverImage}
                    alt={`${project.brand} ${project.model} — ${project.title}`}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-[var(--bg)] text-sm text-[var(--text-muted)]">
                    Brak zdjęcia
                  </div>
                )}
                <div className="p-4">
                  <p className="text-xs text-[var(--text-muted)]">
                    {project.brand} {project.model}
                  </p>
                  <h3 className="mt-1 text-base font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
