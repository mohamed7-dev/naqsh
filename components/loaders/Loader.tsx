import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type LoaderProps = {
  size?: number;
  containerClassName?: string;
};
function Loader(props: LoaderProps) {
  const { size = 10, containerClassName } = props;
  return (
    <div className={cn("flex items-center justify-center", containerClassName)}>
      <Loader2
        className="animate-spin text-primary"
        style={{
          width: size,
          height: size,
        }}
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export { Loader };
