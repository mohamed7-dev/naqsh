import { routes } from "@/config/routes";
import Link from "next/link";
import React from "react";

function LoginFooter() {
  return (
    <p className="w-full text-xs">
      Don&apos;t have an account?{" "}
      <Link className="text-sky-600 hover:underline ms-2" href={routes.signup}>
        Signup
      </Link>
    </p>
  );
}
export { LoginFooter };
