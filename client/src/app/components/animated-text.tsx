"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  variant?: "glow" | "gradient" | "pulse";
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  variant = "glow",
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50 + delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  const variantStyles = {
    glow: "text-primary drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]",
    gradient:
      "bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] bg-clip-text text-transparent animate-gradient",
    pulse: "text-primary animate-pulse",
  };

  return (
    <span
      className={cn(
        "inline-block",
        variantStyles[variant],
        className
      )}
    >
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function CountUp({
  value,
  duration = 2000,
  decimals = 0,
  className,
}: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(startValue + (endValue - startValue) * easeOutQuart);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className={className}>
      {count.toFixed(decimals)}
    </span>
  );
}

