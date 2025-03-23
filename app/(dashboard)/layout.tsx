import Header from "@/features/dashboard/components/Header";
import { Sidebar } from "@/features/dashboard/components/Sidebar";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};
function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-background h-screen flex gap-4">
      <aside className="hidden lg:block w-[20rem] h-full px-2">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col h-full">
        <header className="h-[4rem] w-full p-4">
          <Header />
        </header>
        <main className="bg-muted flex-1 overflow-scroll p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
