"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface GamingSliderProps {
  label: string;
  name: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}

export function GamingSlider({
  label,
  name,
  value,
  onValueChange,
  min,
  max,
  step,
  className,
}: GamingSliderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("space-y-2 group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label && (
        <div className="flex justify-between items-center">
          <Label htmlFor={name} className="text-sm font-medium">
            {label}
          </Label>
          <div className="relative">
            <span
              className={cn(
                "text-sm font-bold text-primary transition-all duration-300",
                isHovered && "scale-110 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]"
              )}
            >
              {value.toFixed(step < 1 ? 2 : 0)}
            </span>
          </div>
        </div>
      )}
      {!label && (
        <div className="flex justify-end">
          <span
            className={cn(
              "text-sm font-bold text-primary transition-all duration-300",
              isHovered && "scale-110 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]"
            )}
          >
            {value.toFixed(step < 1 ? 2 : 0)}
          </span>
        </div>
      )}
      <div className="relative">
        <Slider
          id={name}
          name={name}
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={(vals) => onValueChange(vals[0])}
          className={cn(
            "transition-all duration-300",
            isHovered && "scale-[1.02]"
          )}
        />
        {/* Glow effect on hover */}
        <div
          className={cn(
            "absolute inset-0 -z-10 bg-red-500/20 blur-xl rounded-full transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    </div>
  );
}

