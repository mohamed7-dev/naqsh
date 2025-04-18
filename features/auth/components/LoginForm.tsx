"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingButton } from "@/components/LoadingButton";
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const error = searchParams.get("error");

  const { mutateAsync: login, isPending } = useLogin();

  const [form, setForm] = React.useState<{
    password: string;
    email: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ credentials: form, from }).then(() => {
      toast.success("Successfull Login", {
        description: "Logged in Successfully!",
        duration: 3000,
      });
    });
  };

  return (
    <>
      {!!error && (
        <Alert variant={"destructive"}>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Invalid email or password</AlertDescription>
        </Alert>
      )}
      <form onSubmit={onSubmit} className="space-y-2.5">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />
        </div>
        <LoadingButton
          loading={isPending}
          disabled={isPending}
          type="submit"
          className="w-full"
          size="lg"
        >
          Login
        </LoadingButton>
      </form>
    </>
  );
}

export { LoginForm };
