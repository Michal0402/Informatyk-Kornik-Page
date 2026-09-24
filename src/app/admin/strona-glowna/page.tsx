import { HeroEditor } from "@/components/admin/HeroEditor";
import { getHero } from "@/lib/content";

export default async function Page() {
  return <HeroEditor initial={await getHero()} />;
}
