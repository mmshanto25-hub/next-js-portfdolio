import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "small" | "large" | "full";
}

export function Container({
  children,
  className,
  size = "default",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    small: "max-w-4xl",
    default: "max-w-7xl",
    large: "max-w-[1440px]",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
