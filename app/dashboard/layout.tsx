import { AppSidebar } from "@/components/ui/custom/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";
import { UserButton } from "@clerk/nextjs";

function Dashboardlayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full h-screen overflow-hidden bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 transition-all ease-in-out">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-lg font-semibold ml-2">Cognix AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-6xl h-full">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Dashboardlayout;
