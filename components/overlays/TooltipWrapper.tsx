import React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipContentProps = React.ComponentProps<typeof TooltipContent>;

export interface TooltipWrapperProps extends TooltipContentProps {
  label: string;
}

function TooltipWrapper(props: TooltipWrapperProps) {
  const { children, side, align, sideOffset, alignOffset, label, ...rest } =
    props;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-white bg-slate-800 border-slate-800"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          {...rest}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { TooltipWrapper };
