"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FormInputs,
  UPDATE_FORM_NAME,
  UpdateProjectForm,
} from "./UpdateProjectForm";
import { Button } from "@/components/ui/button";
import { CopyIcon, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useDuplicateProject } from "../hooks/useDuplicateProject";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/Utils";
import { useRouter } from "next/navigation";

type Action = "Update" | "Delete" | null;
type ActionDialogProps = { id: string; name: string };

function ActionsCell({ id, name }: ActionDialogProps) {
  const [action, setAction] = React.useState<Action>(null);
  const router = useRouter();
  const onSuccess = React.useCallback(
    (data: { message?: string }) => {
      toast.success("Success", {
        description: data?.message,
      });
      router.refresh();
    },
    [router]
  );
  const onError = React.useCallback((error: ErrorResponse) => {
    toast.success(error.name, {
      description: error.message,
    });
  }, []);
  // Duplicate
  const { mutateAsync: duplicate, isPending: isDuplicating } =
    useDuplicateProject(id, { onSuccess, onError });
  const handleDuplication = React.useCallback(async () => {
    await duplicate({ id });
  }, [duplicate, id]);

  // Delete
  const { mutateAsync: deleteProject, isPending: isDeleting } =
    useDeleteProject(id, { onSuccess, onError });
  const handleDeleting = React.useCallback(async () => {
    await deleteProject({ id: id });
  }, [deleteProject, id]);

  // Update
  const { mutateAsync: updateProject, isPending: isUpdating } =
    useUpdateProject("");
  const handleUpdating = React.useCallback(
    async (values: FormInputs) => {
      await updateProject({ json: { ...values }, param: { id: id } });
      setAction(null);
    },
    [updateProject, id]
  );

  return (
    <AlertDialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button disabled={false} size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuItem
            className="h-10 cursor-pointer"
            disabled={isDuplicating}
            onClick={handleDuplication}
          >
            <CopyIcon />
            <span>Duplicate project</span>
          </DropdownMenuItem>

          <AlertDialogTrigger onClick={() => setAction("Delete")} asChild>
            <DropdownMenuItem
              className="h-10 cursor-pointer"
              disabled={isDeleting}
            >
              <Trash />
              <span>Delete</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogTrigger onClick={() => setAction("Update")} asChild>
            <DropdownMenuItem
              className="h-10 cursor-pointer"
              disabled={isUpdating}
            >
              <Pencil />
              <span>Edit</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action === "Update" ? "Update Project" : "Are you sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {action === "Update"
              ? "update project.."
              : "You are about to delete this project."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {action === "Update" && (
          <UpdateProjectForm
            defaultValues={{ name }}
            submitCb={handleUpdating}
          />
        )}
        <AlertDialogFooter className="pt-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type={action === "Update" ? "submit" : "button"}
            form={action === "Update" ? UPDATE_FORM_NAME : undefined}
            onClick={action === "Update" ? undefined : handleDeleting}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ActionsCell };
