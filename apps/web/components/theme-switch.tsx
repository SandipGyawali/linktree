"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@linktree/ui/select";

type Theme = "dark" | "system" | "light";

const ThemeIcon = ({ currentTheme }: { currentTheme?: Theme }) => {
  if (currentTheme === "dark") return <Moon size={12} />;
  if (currentTheme === "system") return <Monitor size={12} />;
  return <Sun size={12} />;
};

export const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const availableThemes: Theme[] = ["light", "dark", "system"];

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[32px]" />;

  return (
    <div className="flex items-center relative">
      <Select
        value={theme}
        onValueChange={(value: Theme) => setTheme(value)}
      >
        <SelectTrigger className="w-full pl-6 pr-3 py-1.5 bg-transparent outline-none capitalize h-[32px] text-xs">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {availableThemes.map((item) => (
              <SelectItem key={item} value={item} className="capitalize">
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="absolute left-2 pointer-events-none">
        <ThemeIcon currentTheme={resolvedTheme as Theme} />
      </div>
    </div>
  );
};
