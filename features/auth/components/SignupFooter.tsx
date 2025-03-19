import { routes } from "@/config/routes";
import Link from "next/link";
import React from "react";

function SignupFooter() {
  return (
    <p className="w-full text-xs">
      Already have an account?{" "}
      <Link className="text-sky-600 hover:underline ms-2" href={routes.login}>
        Login
      </Link>
    </p>
  );
}
export { SignupFooter };
