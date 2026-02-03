"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = "default", size = "md", dot = false, pulse = false, children, ...props }) => {
  const variants = {
    default: "bg-[#0F2A44]/10 text-[#0F2A44] border-[#0F2A44]/20",
    success: "bg-green-50 text-green-600 border-green-200",
    warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
    danger: "bg-red-50 text-red-600 border-red-200",
    outline: "bg-transparent text-gray-600 border-gray-300",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 font-medium rounded-full border", variants[variant], sizes[size], className)} {...props}>
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", 
          variant === "success" && "bg-green-500",
          variant === "warning" && "bg-yellow-500",
          variant === "danger" && "bg-red-500",
          variant === "default" && "bg-[#0F2A44]",
          pulse && "animate-pulse"
        )} />
      )}
      {children}
    </span>
  );
};
