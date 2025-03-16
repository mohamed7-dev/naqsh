import type { Metadata, Viewport } from "next";
import "./globals.css";
import { roboto } from "@/lib/fonts";
import { COMMON_METADATA } from "@/config/app";

export const metadata: Metadata = {
  ...COMMON_METADATA,
  description: "Design tool for artisans.",
};

export const viewport: Viewport = {
  themeColor: "#5417d7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}  antialiased`}>{children}</body>
    </html>
  );
}
