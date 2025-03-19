"use client";
import React from "react";
import { QueryClientProvider } from "./QueryClientProvider";
import { Toaster } from "../ui/sonner";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type ProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};
function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider>
        {children}
        <Toaster position="bottom-right" />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export { Providers };
