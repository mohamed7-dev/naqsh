import { UserButton } from "@/features/auth/components/UserButton";
import React from "react";

function Header() {
  return (
    <nav className="w-full h-full flex items-center justify-end">
      <UserButton />
    </nav>
  );
}

export default Header;
