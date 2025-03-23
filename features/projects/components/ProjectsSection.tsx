"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody } from "@/components/ui/table";
import { useGetProjects } from "../hooks/useGetProjects";
import { Search } from "lucide-react";
import { Loader } from "@/components/loaders/Loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProjectRow } from "./ProjectRow";
import { useDuplicateProjectStatus } from "../hooks/useDuplicateProject";
import { useDeleteProjectStatus } from "../hooks/useDeleteProject";
import { cn } from "@/lib/utils";

function ProjectsSection() {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useGetProjects();
  const projects = data?.pages.map((page) => page.data).flat() || [];
  const { isPending: isDuplicating } = useDuplicateProjectStatus();
  const { isPending: isDeleting } = useDeleteProjectStatus();
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Recent projects</h2>
      {isPending && <Loader size={20} />}
      {isError && (
        <Alert variant={"destructive"}>
          <AlertTitle>{error.name}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      {!projects?.length && !isPending && (
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No projects found</p>
        </div>
      )}

      <Table>
        <TableBody
          className={cn((isDuplicating || isDeleting) && "opacity-75")}
        >
          {projects?.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <div className="w-full flex items-center justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}

export { ProjectsSection };
