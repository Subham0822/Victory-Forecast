'use client';
import { useFormStatus } from 'react-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SubmitButtonProps extends ButtonProps {
    children: React.ReactNode;
}

export function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button 
      {...props} 
      disabled={pending} 
      className={cn(
        "relative overflow-hidden group",
        "bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B]",
        "hover:from-[#DC2626] hover:via-[#991B1B] hover:to-[#DC2626]",
        "text-white font-bold text-lg px-8 py-6",
        "transition-all duration-500",
        "hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "animate-gradient bg-[length:200%_200%]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background effect */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
        "translate-x-[-100%] group-hover:translate-x-[100%]",
        "transition-transform duration-1000"
      )} />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Predicting...</span>
          </>
        ) : (
          <>
            {isHovered && <Sparkles className="h-4 w-4 animate-pulse" />}
            {children}
            {isHovered && <Sparkles className="h-4 w-4 animate-pulse" />}
          </>
        )}
      </span>
    </Button>
  );
}
