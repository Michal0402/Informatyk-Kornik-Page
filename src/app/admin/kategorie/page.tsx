import { CategoriesEditor } from "@/components/admin/CategoriesEditor";
import { getCategories } from "@/lib/content";

export default async function Page() {
  return <CategoriesEditor initial={await getCategories()} />;
}
