"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { signIn } from "next-auth/react";
import { commonRoutes } from "@/config/routes";

type SocialAuthButtonsProps = {
  redirectTo?: string;
};
function SocialAuthButtons(props: SocialAuthButtonsProps) {
  const { redirectTo } = props;
  const handleSocialAuth = async (provider: "google") => {
    await signIn(provider, {
      redirectTo: redirectTo ? redirectTo : commonRoutes.loginRedirectTo,
    });
  };
  return (
    <>
      <Button
        variant={"secondary"}
        size={"lg"}
        className="gap-2 w-full [&_svg]:size-6"
        onClick={() => handleSocialAuth("google")}
      >
        <Icons.google />
        Continue with google
      </Button>
    </>
  );
}

export { SocialAuthButtons };
