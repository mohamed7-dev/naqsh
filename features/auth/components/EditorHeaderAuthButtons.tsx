import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { commonRoutes, routes } from "@/config/routes";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSession } from "../hooks/useSession";
import { Loader } from "@/components/loaders/Loader";
import { signOut } from "next-auth/react";

type EditorHeaderAuthButtonsProps = React.ComponentProps<
  typeof DropdownMenuItem
>;
function EditorHeaderAuthButtons(props: EditorHeaderAuthButtonsProps) {
  const { isLoading, isAuthenticated } = useSession();
  const handleLogout = async (e: React.MouseEvent<HTMLDivElement>) => {
    await signOut({ redirectTo: commonRoutes.loginRedirectTo });
    props.onClick?.(e);
  };
  if (isLoading) {
    return (
      <DropdownMenuItem {...props}>
        <Loader />
        <span className="sr-only">loading user info</span>
      </DropdownMenuItem>
    );
  }
  return (
    <>
      {isAuthenticated ? (
        <DropdownMenuItem {...props} onClick={handleLogout}>
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem {...props} asChild>
          <Link href={routes.login}>
            <LogIn />
            <span>Login</span>
          </Link>
        </DropdownMenuItem>
      )}
    </>
  );
}

export { EditorHeaderAuthButtons };
