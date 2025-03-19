import React from "react";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { SignupFooter } from "@/features/auth/components/SignupFooter";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { SocialAuthButtons } from "@/features/auth/components/SocialAuthButtons";

function Signup() {
  return (
    <AuthCard
      cardTitle="Signup to continue"
      cardDescription="Use your email or your google account to continue"
      Footer={<SignupFooter />}
    >
      <div className="space-y-4">
        <SignupForm />
        <span className="w-full flex items-center justify-center">OR</span>
        <SocialAuthButtons />
      </div>
    </AuthCard>
  );
}

export default Signup;
