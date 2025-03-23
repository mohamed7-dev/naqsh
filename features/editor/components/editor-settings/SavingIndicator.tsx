"use client";
import React from "react";
import { Loader } from "@/components/loaders/Loader";
import { useUpdateProjectStatus } from "@/features/projects/hooks/useUpdateProject";
import { Cloud, CloudOff } from "lucide-react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { EditorItemProps } from "../../Types";

type SavingIndicatorProps = EditorItemProps;
const SavingIndicator = React.memo(function SavingIndicator({
  editor,
}: SavingIndicatorProps) {
  const params = useParams<{ projectId: string }>();
  const history = editor?.history;
  const isHistoryEmpty = history?.current && history.current.length === 0;
  const { isError, isPending } = useUpdateProjectStatus(params.projectId);

  if (!isPending && isHistoryEmpty) return null;
  return (
    <div
      className={cn(
        buttonVariants({ variant: "background", size: "floating" })
      )}
    >
      {isPending && (
        <div className="flex items-center gap-x-2">
          <Loader containerClassName="hidden md:block" />
          <div className="text-xs text-muted-foreground">Saving...</div>
        </div>
      )}
      {!isPending && isError && (
        <div className="flex items-center gap-x-2">
          <CloudOff className="size-[20px] text-muted-foreground hidden md:block" />
          <div className="text-xs text-muted-foreground">Failed to save</div>
        </div>
      )}
      {!isHistoryEmpty && !isPending && (
        <div className="flex items-center gap-x-2">
          <Cloud className="size-[20px] text-muted-foreground hidden md:block" />
          <div className="text-xs text-muted-foreground">Ctrl + S</div>
        </div>
      )}
    </div>
  );
});

export { SavingIndicator };
