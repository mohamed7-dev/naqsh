import { Banner } from "@/features/dashboard/components/Banner";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { TemplatesSection } from "@/features/templates/components/TemplatesSection";

function Dashboard() {
  return (
    <div className="flex flex-col gap-y-6 max-w-screen-2xl mx-auto pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
}

export default Dashboard;
