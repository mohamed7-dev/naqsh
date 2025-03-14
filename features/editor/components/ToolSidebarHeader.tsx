import React from "react";

type ToolSidebarHeaderProps = {
  title: string;
  description?: string;
};
function ToolSidebarHeader(props: ToolSidebarHeaderProps) {
  const { title, description } = props;
  return (
    <div className="space-y-2 border-b p-4">
      <h2 className="text-sm font-medium">{title}</h2>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export { ToolSidebarHeader };
