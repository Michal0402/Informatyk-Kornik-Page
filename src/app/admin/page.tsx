import Link from "next/link";
import {
  getCategories,
  getFaq,
  getProjects,
  getServices,
  getSite,
} from "@/lib/content";

export default async function AdminDashboard() {
  const [site, services, projects, categories, faq] = await Promise.all([
    getSite(),
    getServices(),
    getProjects(),
    getCategories(),
    getFaq(),
  ]);

  const cards = [
    { label: "Usługi", value: services.length },
    { label: "Realizacje", value: projects.length },
    { label: "Kategorie", value: categories.length },
    { label: "FAQ", value: faq.length },
  ];

  const actions = [
    { href: "/admin/dane-firmy", label: "Zmień telefon / nazwę" },
    { href: "/admin/realizacje", label: "Dodaj realizację" },
    { href: "/admin/cennik", label: "Edytuj cennik" },
    { href: "/admin/seo", label: "SEO" },
    { href: "/", label: "Zobacz stronę" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-[var(--text-secondary)]">{site.companyName}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-5">
            <p className="text-sm text-[var(--text-muted)]">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold">{c.value}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mb-3 text-lg font-semibold">Szybkie akcje</h2>
        <div className="flex flex-wrap gap-2">
          {actions.map((a) => (
            <Link key={a.href} href={a.href} className="btn btn-secondary">
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
