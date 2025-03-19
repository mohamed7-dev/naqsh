import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoSVG from "@/public/logo.svg";
import { routes } from "@/config/routes";
import { APP_NAME } from "@/config/app";
import { cn } from "@/lib/utils";

type LogoProps = React.ComponentProps<typeof Image>;
function Logo(props: Omit<LogoProps, "src" | "alt">) {
  const { className, ...rest } = props;
  return (
    <Link href={routes.landing} className="flex items-center gap-2">
      <div className="size-8">
        <Image
          src={LogoSVG}
          alt="app logo"
          className={cn("hover:opacity-75 transition-opacity", className)}
          {...rest}
        />
      </div>
      <p className="text-xl text-primary">{APP_NAME}</p>
    </Link>
  );
}

export { Logo };
