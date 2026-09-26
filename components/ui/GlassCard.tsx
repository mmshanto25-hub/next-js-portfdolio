import React from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "interactive" | "subtle" | "glow";
  padding?: "none" | "sm" | "md" | "lg";
}

export function GlassCard({
  children,
  className,
  variant = "default",
  padding = "md",
  ...props
}: GlassCardProps) {
  const paddingStyles = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-8",
    lg: "p-8 sm:p-10",
  };

  const variantStyles = {
    default:
      "bg-card backdrop-blur-md border border-cardBorder rounded-card transition-all duration-300",
    interactive:
      "bg-card hover:bg-white/[0.07] backdrop-blur-md border border-cardBorder hover:border-white/20 rounded-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5",
    subtle:
      "bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-card transition-colors duration-200",
    glow:
      "relative bg-card backdrop-blur-md border border-cardBorder rounded-card before:absolute before:-inset-px before:rounded-card before:bg-gradient-to-r before:from-accent-blue/20 before:via-accent-cyan/20 before:to-accent-purple/20 before:-z-10 before:blur-sm",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
