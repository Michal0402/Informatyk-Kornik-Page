import { AdminShell } from "@/components/admin/AdminShell";
import { getSite } from "@/lib/content";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();
  return <AdminShell companyName={site.companyShortName}>{children}</AdminShell>;
}
