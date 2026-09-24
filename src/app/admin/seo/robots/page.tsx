import { RobotsEditor } from "@/components/admin/RobotsEditor";
import { getRobots } from "@/lib/content";

export default async function Page() {
  return <RobotsEditor initial={await getRobots()} />;
}
