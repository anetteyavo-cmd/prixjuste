"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, hover = false, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300",
        hover && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  change?: { value: string | number; label: string };
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend = "neutral", change }) => {
  const trendColors = {
    up: "text-green-600 bg-green-50",
    down: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  return (
    <Card className="group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 group-hover:text-[#0F2A44] transition-colors">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", trendColors[trend])}>
                {trend === "up" && typeof change.value === 'number' ? "+" : ""}{change.value}
              </span>
              <span className="text-xs text-gray-500">{change.label}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-[#0F2A44]/10 text-[#0F2A44] group-hover:bg-[#0F2A44] group-hover:text-white transition-all">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
