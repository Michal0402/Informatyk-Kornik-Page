"use client";

import type { FaqItem } from "@/types/content";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="section">
      <div className="container-page max-w-3xl">
        <h2 className="section-title">Najczęstsze pytania</h2>
        <p className="section-lead">Krótko i konkretnie — zanim zadzwonisz.</p>
        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <details
              key={item.id}
              className="card group open:border-[var(--border-strong)]"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-[var(--accent)] transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <div className="border-t border-[var(--border)] px-5 py-4 text-sm text-[var(--text-secondary)]">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
