const STEPS = [
  {
    n: "01",
    title: "Kontakt",
    text: "Podajesz model telefonu i opisujesz usterkę.",
  },
  {
    n: "02",
    title: "Odbiór",
    text: "Ustalamy miejsce i termin odbioru.",
  },
  {
    n: "03",
    title: "Diagnoza i wycena",
    text: "Sprawdzamy telefon i potwierdzamy koszt.",
  },
  {
    n: "04",
    title: "Naprawa i zwrot",
    text: "Po wykonaniu usługi urządzenie wraca do klienta.",
  },
];

export function PickupProcess() {
  return (
    <section id="jak-dzialamy" className="section bg-[var(--bg-secondary)]">
      <div className="container-page">
        <h2 className="section-title">Nie musisz dowozić telefonu</h2>
        <p className="section-lead">
          Na terenie Kórnika i pobliskich miejscowości możliwy jest odbiór telefonu, wykonanie
          naprawy i późniejszy zwrot urządzenia.
        </p>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.n} className="card p-5">
              <span className="text-sm font-semibold text-[var(--accent)]">{step.n}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
