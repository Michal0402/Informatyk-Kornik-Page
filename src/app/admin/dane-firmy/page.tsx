import { SiteEditor } from "@/components/admin/SiteEditor";
import { getSite } from "@/lib/content";

export default async function Page() {
  return <SiteEditor initial={await getSite()} />;
}
