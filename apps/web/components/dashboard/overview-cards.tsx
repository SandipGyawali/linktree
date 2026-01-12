"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cursor01Icon,
  Link01Icon,
  Share08Icon,
  EyeIcon,
  InstagramIcon,
} from "@hugeicons/core-free-icons";

const overviewStats = [
  {
    label: "Total Clicks",
    value: "18,640",
    icon: Cursor01Icon,
    color: "#3b82f6",
  },
  {
    label: "Active Links",
    value: "27",
    icon: Link01Icon,
    color: "#22c55e",
  },
  {
    label: "Short URLs",
    value: "38",
    icon: Share08Icon,
    color: "#ec4899",
  },
  {
    label: "Bio Page Views",
    value: "9,412",
    icon: EyeIcon,
    color: "#f59e0b",
  },
  {
    label: "Social Links",
    value: 6,
    icon: InstagramIcon,
    color: "#ec4899",
  },
];

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {overviewStats.map((item) => (
        <div
          key={item.label}
          className="p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
        >
          <div
            className="size-10 rounded-lg flex items-center justify-center mb-3"
            style={{ backgroundColor: `${item.color}15` }}
          >
            <HugeiconsIcon
              icon={item.icon}
              className="size-5"
              style={{ color: item.color }}
            />
          </div>

          <p className="font-medium text-sm mb-0.5">
            {item.label}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              {item.value}
            </span>
            <span className="text-xs text-muted-foreground">
              overall
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
