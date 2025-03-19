"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { commonRoutes } from "@/config/routes";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const error = searchParams.get("error");

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
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirectTo: from ? from : commonRoutes.loginRedirectTo,
    }).then(() => {
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
        <Button type="submit" className="w-full" size="lg">
          Login
        </Button>
      </form>
    </>
  );
}

export { LoginForm };
