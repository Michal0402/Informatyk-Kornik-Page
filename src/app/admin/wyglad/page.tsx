import { AppearanceEditor } from "@/components/admin/AppearanceEditor";
import { getAppearance } from "@/lib/content";

export default async function Page() {
  return <AppearanceEditor initial={await getAppearance()} />;
}
