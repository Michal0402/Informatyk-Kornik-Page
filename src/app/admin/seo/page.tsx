import { SeoEditor } from "@/components/admin/SeoEditor";
import { getSeo } from "@/lib/content";

export default async function Page() {
  return <SeoEditor initial={await getSeo()} />;
}
