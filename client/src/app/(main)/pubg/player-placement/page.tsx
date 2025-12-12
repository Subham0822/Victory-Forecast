'use client';

import { useActionState } from 'react';
import { pubgPlayerPlacementAction } from '@/app/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GamingSlider } from '@/app/components/gaming-slider';
import { SubmitButton } from '@/app/components/submit-button';
import { useFormStatus } from 'react-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const initialState = { placement: null, error: null };

function PredictionResult({ state }: { state: typeof initialState }) {
    const { pending } = useFormStatus();

    if (pending) {
        return <Skeleton className="h-10 w-3/4" />
    }

    if (state.error) {
        return <p className="text-destructive">{state.error}</p>;
    }
    
    if (state.placement !== null) {
        const placementPercent = (state.placement * 100).toFixed(1);
        let message = '';
        let messageClass = '';
        if (state.placement > 0.8) {
            message = "🏆 Great job! You're likely to finish Top 20% or better!";
            messageClass = "text-green-400";
        } else if (state.placement > 0.5) {
            message = "💪 You're in the Top 50% range — solid performance!";
            messageClass = "text-gray-300";
        } else {
            message = "😬 Below average — try increasing movement or healing!";
            messageClass = "text-yellow-400";
        }
        
        return (
            <div className="text-center p-8 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg space-y-4 border-2 border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 animate-pulse" />
                
                <div className="relative z-10 space-y-2">
                  <p className="text-muted-foreground text-sm uppercase tracking-wider">Predicted Win Placement Percentile</p>
                  <div className="text-6xl font-extrabold bg-gradient-to-r from-primary via-[#DC2626] to-primary bg-clip-text text-transparent animate-gradient">
                    {state.placement.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">This player is predicted to place better than <span className="text-primary font-semibold">{placementPercent}%</span> of players.</p>
                  <p className={cn("text-base font-semibold mt-4 animate-pulse", messageClass)}>{message}</p>
                </div>
            </div>
        );
    }
    
    return null;
}

const playerFields = [
    { name: "walkDistance", label: "Walk Distance (meters)", defaultValue: 2000, min: 0, max: 10000, step: 100 },
    { name: "rideDistance", label: "Ride Distance (meters)", defaultValue: 5000, min: 0, max: 20000, step: 100 },
    { name: "boosts", label: "Boosts Used", defaultValue: 2, min: 0, max: 20, step: 1 },
    { name: "heals", label: "Heals Used", defaultValue: 2, min: 0, max: 20, step: 1 },
    { name: "damageDealt", label: "Damage Dealt", defaultValue: 300, min: 0, max: 1500, step: 10 },
    { name: "kills", label: "Kills", defaultValue: 2, min: 0, max: 20, step: 1 },
    { name: "DBNOs", label: "DBNOs (Knocks)", defaultValue: 1, min: 0, max: 10, step: 1 },
    { name: "longestKill", label: "Longest Kill Distance (m)", defaultValue: 50, min: 0, max: 500, step: 5 },
    { name: "killPlace", label: "Kill Placement Rank", defaultValue: 50, min: 1, max: 100, step: 1 },
    { name: "weaponsAcquired", label: "Weapons Acquired", defaultValue: 3, min: 0, max: 20, step: 1 },
];

export default function PubgPlayerPlacementPage() {
  const [state, formAction] = useActionState(pubgPlayerPlacementAction, initialState);
  
  // Initialize state for player stats
  const [playerValues, setPlayerValues] = useState<Record<string, number>>(
    Object.fromEntries(playerFields.map(f => [f.name, f.defaultValue]))
  );

  return (
    <div className="max-w-2xl mx-auto">
        <div className="space-y-2 mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] bg-clip-text text-transparent animate-gradient">
            PUBG Player Placement Prediction
          </h1>
          <p className="text-muted-foreground text-lg">
            Enter a player's match statistics to predict their placement percentile.
          </p>
        </div>

        <form action={formAction}>
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Player Statistics</CardTitle>
                <CardDescription>Provide the player's performance data from a match.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {playerFields.map(field => (
                    <div className="space-y-2" key={field.name}>
                        <GamingSlider
                            label={field.label}
                            name={field.name}
                            value={playerValues[field.name]}
                            onValueChange={(value) => setPlayerValues(prev => ({ ...prev, [field.name]: value }))}
                            min={field.min}
                            max={field.max}
                            step={field.step}
                        />
                        <input type="hidden" name={field.name} value={playerValues[field.name]} />
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-6">
                <SubmitButton>Predict Placement 🎯</SubmitButton>
                <div className="w-full">
                   <PredictionResult state={state} />
                </div>
            </CardFooter>
            </Card>
      </form>
    </div>
  );
}
