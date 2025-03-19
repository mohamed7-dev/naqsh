import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoSVG from "@/public/logo.svg";
import { routes } from "@/config/routes";

function Logo() {
  return (
    <Link href={routes.landing}>
      <div className="size-8">
        <Image
          src={LogoSVG}
          alt="app logo"
          className="hover:opacity-75 transition-opacity"
        />
      </div>
    </Link>
  );
}

export { Logo };
