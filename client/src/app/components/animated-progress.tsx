"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AnimatedProgressProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function AnimatedProgress({
  value,
  className,
  showLabel = true,
}: AnimatedProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Win Probability</span>
          <span className="text-sm font-bold text-primary">
            {displayValue.toFixed(0)}%
          </span>
        </div>
      )}
      <div className="relative">
        <Progress
          value={displayValue}
          className="h-3 bg-secondary/50"
        />
        {/* Glow effect */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] rounded-full transition-all duration-300"
          style={{
            width: `${displayValue}%`,
            boxShadow: `0 0 20px rgba(220, 38, 38, ${displayValue / 100})`,
          }}
        />
      </div>
    </div>
  );
}

