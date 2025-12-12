import Link from "next/link";
import {
  BrainCircuit,
  Swords,
  Gamepad2,
  Shield,
  Sparkles,
  Wand2,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  ValorantIcon,
  CsgoIcon,
  PubgIcon,
  LolIcon,
} from "@/app/components/icons";
import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <BrainCircuit className="text-primary w-8 h-8 animate-pulse-glow" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-primary animate-ping" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-[#DC2626] bg-clip-text text-transparent">
              Victory Forecast
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  "hover:text-primary hover:translate-x-1"
                )}
              >
                <Gamepad2
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuItem>

            <SidebarGroup>
              <SidebarGroupLabel>Games</SidebarGroupLabel>
              <SidebarMenuItem>
                <Link
                  href="/valorant/team-vs-team"
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    "hover:text-primary hover:translate-x-1"
                  )}
                >
                  <ValorantIcon className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                  <span>Valorant</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/csgo/team-vs-team"
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    "hover:text-primary hover:translate-x-1"
                  )}
                >
                  <CsgoIcon className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                  <span>CS:GO</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/pubg/player-placement"
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    "hover:text-primary hover:translate-x-1"
                  )}
                >
                  <PubgIcon className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                  <span>PUBG</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/league-of-legends/match-prediction"
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    "hover:text-primary hover:translate-x-1"
                  )}
                >
                  <LolIcon className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                  <span>League of Legends</span>
                </Link>
              </SidebarMenuItem>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Tools</SidebarGroupLabel>
              <SidebarMenuItem>
                <Link
                  href="/team-name-generator"
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    "hover:text-primary hover:translate-x-1"
                  )}
                >
                  <Wand2 className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                  <span>Team Name Generator</span>
                </Link>
              </SidebarMenuItem>
            </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/* Can add user profile or settings here later */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b border-primary/20 bg-gradient-to-r from-background via-background/95 to-background backdrop-blur-sm">
          <SidebarTrigger className="hover:text-primary transition-colors" />
          {/* Can add breadcrumbs or page title here */}
        </header>
        <main className="p-4 sm:p-6 lg:p-8 relative z-10">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
