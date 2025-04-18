"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useSignup } from "../hooks/useSignup";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingButton } from "@/components/LoadingButton";
import { useLogin } from "../hooks/useLogin";

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

  const onSuccess = async (data: { message?: string }) => {
    await login({ credentials: form, from }).then(() => {
      toast.success("Successfull Authentication", {
        description: data.message,
      });
    });
  };
  const { mutateAsync: signup, isPending, error } = useSignup({ onSuccess });

  const {
    mutateAsync: login,
    isPending: isLoggingIn,
    error: loginError,
  } = useLogin();

  const isError = !!error || !!loginError;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(form);
  };

  return (
    <>
      {isError && (
        <Alert variant={"destructive"}>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {!!error && error.message}
            {!!loginError && loginError.message}
          </AlertDescription>
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
        <LoadingButton
          loading={isPending || isLoggingIn}
          disabled={isPending || isLoggingIn}
          type="submit"
          className="w-full"
          size="lg"
        >
          Register
        </LoadingButton>
      </form>
    </>
  );
}

export { SignupForm };
