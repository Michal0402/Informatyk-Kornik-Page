export function Brands({ brands }: { brands: string[] }) {
  return (
    <section className="section pt-0">
      <div className="container-page">
        <h2 className="section-title">Naprawiane marki</h2>
        <p className="section-lead">Obsługujemy popularne smartfony — nie tylko jedną markę.</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {brands.map((brand) => (
            <li
              key={brand}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-secondary)]"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
