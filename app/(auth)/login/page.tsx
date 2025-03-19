import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginFooter } from "@/features/auth/components/LoginFooter";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { SocialAuthButtons } from "@/features/auth/components/SocialAuthButtons";
import React from "react";

function Login() {
  return (
    <AuthCard
      cardTitle="Login to continue"
      cardDescription="Use your email or your google account to continue"
      Footer={<LoginFooter />}
    >
      <div className="space-y-4">
        <LoginForm />
        <span className="w-full flex items-center justify-center">OR</span>
        <SocialAuthButtons />
      </div>
    </AuthCard>
  );
}

export default Login;
