"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { ErrorResponse } from "@/types/Utils";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProjectError = ({
  error,
  reset,
}: {
  error: (Error & { digest?: string }) | ErrorResponse;
  reset: () => void;
}) => {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <main className="h-screen w-full flex flex-col gap-y-5 items-center justify-center">
      <TriangleAlert className="size-10 text-muted-foreground" />
      <p className="text-muted-foreground text-sm">
        {error.message ? error.message : "Failed to fetch project"}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <Button asChild>
          <Link href={routes.landing}>Back to Home</Link>
        </Button>
        <Button variant="secondary" onClick={() => reset()}>
          Recover
        </Button>
      </div>
    </main>
  );
};

export default ProjectError;
