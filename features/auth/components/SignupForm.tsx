"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useSignup } from "../hooks/useSignup";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { commonRoutes } from "@/config/routes";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SignupForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const [form, setForm] = React.useState<{
    username: string;
    password: string;
    email: string;
  }>({
    email: "",
    username: "",
    password: "",
  });

  const onSuccess = (data: { message?: string }) => {
    toast.success("Successfull Registeration", {
      description: data.message,
    });
  };
  const {
    mutateAsync: signup,
    isPending,
    error,
    isError,
  } = useSignup({ onSuccess });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(form).then(async () => {
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirectTo: from ? from : commonRoutes.loginRedirectTo,
      });
    });
  };

  return (
    <>
      {isError && (
        <Alert variant={"destructive"}>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={onSubmit} className="space-y-2.5">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Full name</Label>
          <Input
            id="signup-name"
            name="username"
            disabled={isPending}
            value={form.username}
            onChange={handleChange}
            placeholder="Full name"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            name="email"
            disabled={isPending}
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            name="password"
            disabled={isPending}
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />
        </div>
        <Button disabled={isPending} type="submit" className="w-full" size="lg">
          Register
        </Button>
      </form>
    </>
  );
}

export { SignupForm };
