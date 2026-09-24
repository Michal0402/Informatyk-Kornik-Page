import { LocationsEditor } from "@/components/admin/LocationsEditor";
import { getLocations } from "@/lib/content";

export default async function Page() {
  return <LocationsEditor initial={await getLocations()} />;
}
