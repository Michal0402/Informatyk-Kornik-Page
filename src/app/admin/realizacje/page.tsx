import { ProjectsEditor } from "@/components/admin/ProjectsEditor";
import { getCategories, getProjects } from "@/lib/content";

export default async function Page() {
  const [projects, categories] = await Promise.all([getProjects(), getCategories()]);
  return <ProjectsEditor initial={projects} categories={categories} />;
}
