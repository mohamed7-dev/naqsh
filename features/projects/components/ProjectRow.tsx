"use client";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { FileIcon } from "lucide-react";
import { Project } from "../Types";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { formatDistanceToNow } from "date-fns";
import { ActionsCell } from "./ActionsCell";

type ProjectRowProps = {
  project: Omit<Project, "creator">;
};
function ProjectRow({ project }: ProjectRowProps) {
  const router = useRouter();
  return (
    <TableRow>
      <TableCell
        onClick={() => router.push(routes.projectEditor(project.id))}
        className="font-medium flex items-center gap-x-2 cursor-pointer"
      >
        <FileIcon />
        <span>{project.name}</span>
      </TableCell>
      <TableCell
        onClick={() => router.push(routes.projectEditor(project.id))}
        className="hidden md:table-cell cursor-pointer"
      >
        {formatDistanceToNow(project.updatedAt, {
          addSuffix: true,
        })}
      </TableCell>
      <TableCell className="flex items-center justify-end">
        <ActionsCell id={project.id} name={project.name} />
      </TableCell>
    </TableRow>
  );
}

export { ProjectRow };
