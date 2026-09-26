import React from "react";
import { cn } from "@/lib/utils";
import { Badge, type BadgeProps } from "./Badge";

export interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: BadgeProps["variant"];
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = "blue",
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col max-w-3xl mb-12 sm:mb-16",
        alignClasses[align],
        className
      )}
    >
      {badge && (
        <Badge variant={badgeVariant} dot size="md" className="mb-4">
          {badge}
        </Badge>
      )}

      {subtitle && (
        <span className="text-accent-blue font-mono text-xs sm:text-sm uppercase tracking-wider mb-2">
          {subtitle}
        </span>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.15]">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
