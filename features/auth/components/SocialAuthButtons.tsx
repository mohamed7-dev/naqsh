"use client";
import React from "react";
import { Icons } from "@/components/ui/icons";
import { signIn } from "next-auth/react";
import { commonRoutes } from "@/config/routes";
import { LoadingButton } from "@/components/LoadingButton";

type SocialAuthButtonsProps = {
  redirectTo?: string;
};
function SocialAuthButtons(props: SocialAuthButtonsProps) {
  const { redirectTo } = props;
  const [isLoading, startTransition] = React.useTransition();
  const handleSocialAuth = (provider: "google") => {
    startTransition(async () => {
      await signIn(provider, {
        redirectTo: redirectTo ? redirectTo : commonRoutes.loginRedirectTo,
      });
    });
  };
  return (
    <LoadingButton
      loaderSize={15}
      loading={isLoading}
      disabled={isLoading}
      variant={"secondary"}
      size={"lg"}
      className="gap-2 w-full [&_svg]:size-4"
      onClick={() => handleSocialAuth("google")}
    >
      <Icons.google />
      <span>Continue with google</span>
    </LoadingButton>
  );
}

export { SocialAuthButtons };
