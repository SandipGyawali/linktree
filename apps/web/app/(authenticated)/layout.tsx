"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@linktree/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { ThemeSwitch } from "../../components/theme-switch";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* HEADER */}
        <header className="sticky top-0 z-100 backdrop:blur-3xl flex h-16 shrink-0 items-start flex-row md:items-center justify-between gap-2 px-4">
          <div className="flex shrink-0 items-center gap-2">
            <SidebarTrigger size={"icon-lg"} className="-ml-1" />
          </div>

          <div className="flex gap-2">
            <ThemeSwitch />
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
