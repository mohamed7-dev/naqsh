"use client";
import React from "react";
import {
  GetTemplatesResponseType,
  useGetTemplates,
} from "../hooks/useGetTemplates";
import { useCreateProject } from "@/features/projects/hooks/useCreateProject";
import { Loader } from "@/components/loaders/Loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TemplateCard } from "./TemplateCard";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { ErrorResponse } from "@/types/Utils";
import { toast } from "sonner";

function TemplatesSection() {
  const router = useRouter();
  const { data, isLoading, isError, error } = useGetTemplates();

  const templates = data?.pages.map((page) => page.data).flat() || [];

  // Create Project
  const onSuccess = (data: { data: { id: string }; message?: string }) => {
    toast.success("Success", {
      description: data.message,
    });
    router.push(routes.projectEditor(data.data.id));
  };
  const onError = (error: ErrorResponse) => {
    toast.error(error.name, {
      description: error.message,
    });
  };
  const { mutateAsync: createProject, isPending: isCreating } =
    useCreateProject({ onSuccess, onError });

  const onClick = React.useCallback(
    async (template: GetTemplatesResponseType["data"][0]) => {
      await createProject({
        name: `${template.name} project`,
        json: template.json,
      });
    },
    [createProject]
  );
  if (!templates.length) return null;
  return (
    <section>
      <h2 className="font-semibold text-lg">Start from a template</h2>
      {isLoading && <Loader size={20} />}
      {isError && (
        <Alert variant={"destructive"}>
          <AlertTitle>{error.name}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] mt-4 gap-4">
        {templates?.map((template) => (
          <li key={template.id} className="w-full">
            <TemplateCard
              name={template.name}
              thumbnailFileId={template.thumbnailFileId || ""}
              onClick={() => onClick(template)}
              disabled={isCreating}
              isPro={template.isPro}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export { TemplatesSection };
