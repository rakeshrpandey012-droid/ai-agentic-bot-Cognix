"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  AppWindow,
  Blocks,
  Bot,
  Layers,
  Play,
  Settings,
  User2,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { UserButton } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppSidebar() {
  const path = usePathname();
  const { userDetail } = useContext(UserDetailContext) as any;
  const route = useRouter();

  // Default values if userDetail is not loaded
  const agentCredits = userDetail?.agentCredits || 0;
  const usageCredits = userDetail?.usageCredits || 0;
  const userName = userDetail?.name || "User";
  const maxAgents = 5;
  const creditsPercentage = (usageCredits / 100) * 100; // Assuming max credits is 100

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row gap-2 items-center px-3 py-2.5">
        <Image src={"/logo.svg"} alt="Logo" width={28} height={28} className="dark:invert" />
        <h2 className="font-semibold text-base text-foreground">Cognix Ai</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs px-2 py-1">Workspace</SidebarGroupLabel>
          <SidebarMenuButton
            onClick={() => route.push("/dashboard")}
            className={`h-9 text-xs gap-2 px-2 hover:bg-accent hover:text-accent-foreground ${path.includes("/dashboard") && !path.includes("/dashboard/") ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            <div className="flex h-6 w-6 shrink-0 bg-blue-100 dark:bg-blue-900/30 items-center justify-center rounded-md">
              <AppWindow className="h-4 w-4 text-blue-900 dark:text-blue-400" />
            </div>
            <span>Dashboard</span>
          </SidebarMenuButton>
          
          <SidebarMenuButton
            onClick={() => route.push("/dashboard/agents")}
            className={`h-9 text-xs gap-2 px-2 hover:bg-accent hover:text-accent-foreground ${path.includes("/dashboard/agents") ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            <div className="flex h-6 w-6 shrink-0 bg-green-100 dark:bg-green-900/30 items-center justify-center rounded-md">
              <Bot className="h-4 w-4 text-green-900 dark:text-green-400" />
            </div>
            <span>Agents</span>
          </SidebarMenuButton>

          <SidebarMenuButton
            onClick={() => route.push("/dashboard/runs")}
            className={`h-9 text-xs gap-2 px-2 hover:bg-accent hover:text-accent-foreground ${path.includes("/dashboard/runs") ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            <div className="flex h-6 w-6 shrink-0 bg-red-100 dark:bg-red-900/30 items-center justify-center rounded-md">
              <Play className="h-4 w-4 text-red-900 dark:text-red-400" />
            </div>
            <span>Runs</span>
          </SidebarMenuButton>

          <SidebarMenuButton
            onClick={() => route.push("/dashboard/integrations")}
            className={`h-9 text-xs gap-2 px-2 hover:bg-accent hover:text-accent-foreground ${path.includes("/dashboard/integrations") ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            <div className="flex h-6 w-6 shrink-0 bg-purple-100 dark:bg-purple-900/30 items-center justify-center rounded-md">
              <Blocks className="h-4 w-4 text-purple-900 dark:text-purple-400" />
            </div>
            <span>Integrations</span>
          </SidebarMenuButton>

          <SidebarMenuButton
            onClick={() => route.push("/dashboard/templates")}
            className={`h-9 text-xs gap-2 px-2 hover:bg-accent hover:text-accent-foreground ${path.includes("/dashboard/templates") ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            <div className="flex h-6 w-6 shrink-0 bg-orange-100 dark:bg-orange-900/30 items-center justify-center rounded-md">
              <Layers className="h-4 w-4 text-orange-900 dark:text-orange-400" />
            </div>
            <span>Templates</span>
          </SidebarMenuButton>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs px-2 py-1">Users</SidebarGroupLabel>
          <SidebarMenuButton
            onClick={() => route.push("/dashboard/settings")}
            className={`h-9 text-xs gap-2 px-2 hover:bg-accent hover:text-accent-foreground ${path.includes("/dashboard/settings") ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            <div className="flex h-6 w-6 shrink-0 bg-gray-100 dark:bg-gray-800 items-center justify-center rounded-md">
              <Settings className="h-4 w-4 text-gray-900 dark:text-gray-300" />
            </div>
            <span>Settings</span>
          </SidebarMenuButton>

          <SidebarMenuButton
            onClick={() => route.push("/dashboard/profile")}
            className={`h-9 text-xs gap-2 px-2 hover:bg-accent hover:text-accent-foreground ${path.includes("/dashboard/profile") ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            <div className="flex h-6 w-6 shrink-0 bg-yellow-100 dark:bg-yellow-900/30 items-center justify-center rounded-md">
              <User2 className="h-4 w-4 text-yellow-900 dark:text-yellow-400" />
            </div>
            <span>Profile</span>
          </SidebarMenuButton>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <div className="p-2 border rounded-md flex gap-2 flex-col bg-card">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">Agents</span>
              <span className="text-xs font-semibold text-foreground">{agentCredits}/{maxAgents}</span>
            </div>
            <Progress value={(agentCredits / maxAgents) * 100} className="h-1.5" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">Credits</span>
              <span className="text-xs font-semibold text-foreground">{usageCredits}</span>
            </div>
            <Progress value={creditsPercentage} className="h-1.5" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 p-1.5 border rounded-md bg-card">
          <div className="flex items-center gap-2">
            <UserButton />
            <span className="text-xs font-medium text-foreground">{userName}</span>
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}