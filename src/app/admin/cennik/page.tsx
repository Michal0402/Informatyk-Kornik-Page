import { PricesEditor } from "@/components/admin/PricesEditor";
import { getPrices } from "@/lib/content";

export default async function Page() {
  return <PricesEditor initial={await getPrices()} />;
}
