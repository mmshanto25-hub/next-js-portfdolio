import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  isExternal,
  isLoading,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/50 disabled:opacity-60 disabled:pointer-events-none select-none active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-accent-blue text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 border border-blue-400/30",
    secondary:
      "bg-secondary text-text-primary hover:bg-slate-800 border border-border hover:border-border-strong",
    outline:
      "bg-transparent text-text-primary border border-border hover:border-white/40 hover:bg-white/5",
    ghost:
      "bg-transparent text-text-secondary hover:text-white hover:bg-white/5",
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  };

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0 transition-transform group-hover:translate-x-0.5">
          {rightIcon}
        </span>
      )}
    </>
  );

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    "group",
    className
  );

  if (href) {
    if (isExternal || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
}
