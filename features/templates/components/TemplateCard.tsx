import React from "react";
import { Project } from "../../projects/Types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Crown } from "lucide-react";
import { previewCardImage } from "@/lib/appwrite";

type TemplateCardProps = Pick<Project, "name" | "isPro" | "thumbnailFileId"> & {
  onClick: () => void;
  disabled?: boolean;
};
function TemplateCard({
  thumbnailFileId,
  name,
  onClick,
  disabled,
  isPro,
}: TemplateCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full space-y-2 group text-left transition flex flex-col",
        disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer"
      )}
    >
      <div className="relative rounded-xl h-[15rem] w-full overflow-hidden border">
        <Image
          fill
          src={previewCardImage(thumbnailFileId || "")}
          alt={name}
          className="object-cover w-full h-full transition transform group-hover:scale-105"
        />
        {isPro && (
          <div className="absolute top-2 right-2 h-10 w-10 flex items-center justify-center bg-black/50 rounded-full -z[10]">
            <Crown className="size-5 fill-yellow-500 text-yellow-500" />
          </div>
        )}
        <div className="opacity-0 group-hover:opacity-100 transition absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl backdrop-filter backdrop-blur-sm">
          <p className="text-white font-medium">Open in editor</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{name}</p>
      </div>
    </button>
  );
}

export { TemplateCard };
