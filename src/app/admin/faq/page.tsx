import { FaqEditor } from "@/components/admin/FaqEditor";
import { getFaq } from "@/lib/content";

export default async function Page() {
  return <FaqEditor initial={await getFaq()} />;
}
