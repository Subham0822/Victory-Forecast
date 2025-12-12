"use client";

import { useActionState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/app/components/submit-button";
import { generateTeamNameAction } from "@/app/lib/actions";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

const initialState = { teamName: null, error: null };

export default function TeamNameGeneratorPage() {
  const [state, formAction] = useActionState(generateTeamNameAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state.error, toast]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Wand2 className="w-10 h-10 text-primary animate-pulse-glow" />
            <Sparkles className="w-5 h-5 text-primary absolute -top-1 -right-1 animate-ping" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] bg-clip-text text-transparent animate-gradient">
            AI Team Name Generator
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Generate creative and unique team names powered by AI. Describe your team's style and get personalized suggestions.
        </p>
      </div>

      {/* Generator Card */}
      <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Generate Team Name
          </CardTitle>
          <CardDescription>
            Enter a style description to get AI-generated team name suggestions.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="styleDescription" className="text-base font-medium">
                Style Description
              </Label>
              <Input
                id="styleDescription"
                name="styleDescription"
                placeholder="e.g., 'Aggressive and fiery', 'Strategic and precise', 'Fast-paced and energetic'"
                required
                className="h-12 text-base"
              />
              <p className="text-sm text-muted-foreground">
                Describe your team's playing style, personality, or theme to get the perfect name.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-6">
            <SubmitButton className="w-full">Generate Name ✨</SubmitButton>
            {state.teamName && (
              <div className="w-full p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg space-y-3 border-2 border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 animate-pulse" />
                
                <div className="relative z-10 space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Generated Team Name</p>
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-primary via-[#DC2626] to-primary bg-clip-text text-transparent animate-gradient text-center">
                    "{state.teamName}"
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    💡 Try generating again with a different style description for more options!
                  </p>
                </div>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>

      {/* Tips Section */}
      <Card className="border-2 border-primary/10 bg-gradient-to-br from-card/50 to-card/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Tips for Best Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Be specific about your team's style (e.g., "tactical and methodical" vs "aggressive")</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Include personality traits or themes you want to convey</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Mention any specific game or esports references if relevant</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Try multiple variations to find the perfect name</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

