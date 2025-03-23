"use client";
import React from "react";
import { QueryClientProvider } from "./QueryClientProvider";
import { Toaster } from "../ui/sonner";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ThemeProvider, ThemeProviderProps } from "./ThemeProvider";

type ProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
  theme?: ThemeProviderProps;
};
function Providers({ children, session, theme }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...theme}
    >
      <SessionProvider session={session}>
        <QueryClientProvider>
          {children}
          <Toaster position="bottom-right" />
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export { Providers };
