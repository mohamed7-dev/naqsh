"use client";
import { ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import { BANNER_DESC, BANNER_HEADER } from "../data/messages";
import { useCreateProject } from "@/features/projects/hooks/useCreateProject";
import { DEFAULT_PROJECT_NAME } from "@/features/editor/config/common";
import { LoadingButton } from "@/components/LoadingButton";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/Utils";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";

function Banner() {
  const router = useRouter();
  const onError = (error: ErrorResponse) => {
    toast.error(error.name, {
      description: error.message,
    });
  };
  const onSuccess = (data: { message?: string; data: { id: string } }) => {
    toast.success("Successfull Creation", {
      description: data.message,
    });
    router.push(routes.projectEditor(data.data.id));
  };
  const { mutateAsync: createProject, isPending } = useCreateProject({
    onError,
    onSuccess,
  });
  const handleCreatingProject = async () => {
    await createProject({
      name: DEFAULT_PROJECT_NAME,
      json: "",
    });
  };
  return (
    <div className="w-full min-h-[15rem] text-white flex gap-x-6 p-6 items-center rounded-xl bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5]">
      <div className="rounded-full size-28 items-center justify-center bg-white/50 hidden md:flex">
        <div className="rounded-full size-20 flex items-center justify-center bg-white">
          <Sparkles className="h-20 text-[#0073ff] fill-[#0073ff]" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-xl md:text-3xl font-semibold">{BANNER_HEADER}</h2>
        <p className="text-xs md:text-sm mb-2">{BANNER_DESC}</p>
        <LoadingButton
          loading={isPending}
          variant="secondary"
          size={"lg"}
          className="w-fit"
          disabled={isPending}
          onClick={handleCreatingProject}
          loaderSize={10}
        >
          {isPending ? (
            <>Creating project...</>
          ) : (
            <>
              Start creating
              <ArrowRight className="size-4 ml-2" />
            </>
          )}
        </LoadingButton>
      </div>
    </div>
  );
}

export { Banner };
