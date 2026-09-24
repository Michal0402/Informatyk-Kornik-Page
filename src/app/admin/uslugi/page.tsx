import { ServicesEditor } from "@/components/admin/ServicesEditor";
import { getServices } from "@/lib/content";

export default async function Page() {
  return <ServicesEditor initial={await getServices()} />;
}
