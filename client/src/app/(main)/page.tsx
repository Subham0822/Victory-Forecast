import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ValorantIcon,
  CsgoIcon,
  PubgIcon,
  LolIcon,
} from "@/app/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Gamepad2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/app/components/animated-text";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "Valorant: Team vs Team",
    description: "Predict the winner of a Valorant match based on team stats.",
    href: "/valorant/team-vs-team",
    icon: <ValorantIcon className="w-6 h-6" />,
  },
  {
    title: "CS:GO: Team vs Team",
    description:
      "Predict the winner of a CS:GO match using key performance stats.",
    href: "/csgo/team-vs-team",
    icon: <CsgoIcon className="w-6 h-6" />,
  },
  {
    title: "PUBG: Player Placement",
    description:
      "Predict a player's final placement percentile in a PUBG match.",
    href: "/pubg/player-placement",
    icon: <PubgIcon className="w-6 h-6" />,
  },
  {
    title: "LoL: Match Prediction",
    description:
      "Predict match outcomes in League of Legends from objective control.",
    href: "/league-of-legends/match-prediction",
    icon: <LolIcon className="w-6 h-6" />,
  },
  {
    title: "AI Team Name Generator",
    description: "Generate creative and unique team names with a spark of AI.",
    href: "/team-name-generator",
    icon: <Gamepad2 className="w-6 h-6" />,
  },
];

export default function DashboardPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero");

  return (
    <div className="space-y-12 relative z-10">
      {/* Hero Section with Animated Text */}
      <div className="space-y-6 relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Gamepad2 className="w-10 h-10 text-primary animate-pulse" />
            <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1 animate-ping" />
          </div>
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <AnimatedText
                text="Welcome to Victory Forecast"
                variant="glow"
                className="block"
              />
            </h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Leverage the power of{" "}
          <span className="text-primary font-semibold">AI</span> to get
          predictions and insights for your favorite esports titles. Select a
          tool below to get started.
        </p>
      </div>

      {/* Animated Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <Link
            href={tool.href}
            key={tool.title}
            className="group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card
              className={cn(
                "h-full relative overflow-hidden",
                "hover:border-primary/60 transition-all duration-500",
                "hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]",
                "hover:-translate-y-2 hover:scale-[1.02]",
                "border-2 border-transparent hover:border-primary/20",
                "bg-gradient-to-br from-card to-card/50",
                "backdrop-blur-sm"
              )}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-primary/10 transition-all duration-500 pointer-events-none" />

              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={cn(
                      "p-3 rounded-lg transition-all duration-300",
                      "bg-gradient-to-br from-primary/20 to-primary/10",
                      "group-hover:from-primary/30 group-hover:to-primary/20",
                      "group-hover:scale-110 group-hover:rotate-3",
                      "shadow-lg"
                    )}
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      {tool.icon}
                    </div>
                  </div>
                  <div className="flex items-center text-xs font-medium text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
                    <span>Use Tool</span>
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 relative z-10">
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                  {tool.title}
                </CardTitle>
                <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                  {tool.description}
                </CardDescription>
              </CardContent>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-lg border-2 border-primary/50 animate-pulse" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
