import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type LoaderProps = {
  size?: number;
  color?: string;
  containerClassName?: string;
};
function Loader(props: LoaderProps) {
  const { size = 10, color = "#001", containerClassName } = props;
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1",
        containerClassName
      )}
    >
      <Loader2
        className="animate-spin"
        style={{
          width: size,
          height: size,
          color: color,
        }}
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export { Loader };
