import type { Metadata, Viewport } from "next";
import "./globals.css";
import { roboto } from "@/lib/fonts";
import { COMMON_METADATA } from "@/config/app";
import { Providers } from "@/components/providers/Providers";
import { getSession } from "@/features/auth/lib/protect";

export const metadata: Metadata = {
  ...COMMON_METADATA,
  description: "Design tool for artisans.",
};

export const viewport: Viewport = {
  themeColor: "#5417d7",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={`${roboto.className}  antialiased`}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
