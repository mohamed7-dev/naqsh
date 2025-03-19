import Image from "next/image";
import React from "react";
import Draw from "@/public/images/auth.jpg";

type AuthLayoutProps = {
  children: React.ReactNode;
};
function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="h-screen flex items-center justify-center relative">
      <div className="z-50 h-full w-full p-2 md:p-0 md:h-auto md:w-[30rem] flex items-center justify-center">
        {children}
      </div>
      <Image
        src={Draw}
        alt="drawing"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="object-cover w-screen h-screen fixed inset-0 z-30"
      />
      <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,.4),rgba(0,0,0,.8))] z-40" />
    </main>
  );
}

export default AuthLayout;
