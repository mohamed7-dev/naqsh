import { Banner } from "@/features/dashboard/components/Banner";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { fetchProjects } from "@/features/projects/fetchers/fetchProjects.fetcher";
import { fetchTemplates } from "@/features/projects/fetchers/fetchTemplates.fetcher";
import { TemplatesSection } from "@/features/templates/components/TemplatesSection";

async function Dashboard() {
  // Projects
  const res = await fetchProjects({ page: 0 });
  if ("error" in res) throw res;
  const projects = {
    ...res,
    data: res.data.map((p) => ({
      ...p,
      createdAt: p.createdAt.toString(),
      updatedAt: p.updatedAt.toString(),
    })),
  };
  // Templates
  const templatesRes = await fetchTemplates({ page: 0 });
  if ("error" in templatesRes) throw templatesRes;
  const templates = {
    ...templatesRes,
    data: templatesRes.data.map((p) => ({
      ...p,
      createdAt: p.createdAt.toString(),
      updatedAt: p.updatedAt.toString(),
    })),
  };
  return (
    <div className="flex flex-col gap-y-6 max-w-screen-2xl mx-auto pb-10">
      <Banner />
      <TemplatesSection initialData={templates} />
      <ProjectsSection initialData={projects} />
    </div>
  );
}

export default Dashboard;
