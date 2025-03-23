"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "../hooks/useSession";
import { Loader } from "@/components/loaders/Loader";

function UserButton() {
  const session = useSession();
  if (session.isLoading) return <Loader />;
  if (session.isUnAuthenticated || !session.data) return null;

  const name = session?.data?.user?.name || "";
  const image = session?.data?.user?.image || "";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        {/* add crown if premium  */}
        <Avatar className="size-10 hover:opcaity-75 transition">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className="bg-blue-500 font-medium text-white flex items-center justify-center">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem className="h-10" onClick={() => signOut()}>
          <LogOut className="mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserButton };
