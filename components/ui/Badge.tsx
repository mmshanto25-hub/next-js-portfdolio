import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "blue" | "cyan" | "purple" | "green" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
  dot = false,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-white/5 text-text-secondary border-white/10",
    blue: "bg-accent-blue/10 text-blue-400 border-accent-blue/30",
    cyan: "bg-accent-cyan/10 text-cyan-400 border-accent-cyan/30",
    purple: "bg-accent-purple/10 text-purple-400 border-accent-purple/30",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    outline: "bg-transparent text-text-muted border-border",
  };

  const dotColors = {
    default: "bg-slate-400",
    blue: "bg-accent-blue animate-pulse",
    cyan: "bg-accent-cyan animate-pulse",
    purple: "bg-accent-purple animate-pulse",
    green: "bg-emerald-400 animate-pulse",
    outline: "bg-slate-500",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5 tracking-wide",
    md: "text-xs font-medium px-3 py-1 tracking-wider uppercase",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border backdrop-blur-sm select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-2 h-2 rounded-full inline-block", dotColors[variant])}
        />
      )}
      <span>{children}</span>
    </div>
  );
}
