"use client";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@linktree/ui/button";

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
      <Button variant="ghost" onClick={() => theme == "dark" ? setTheme("light") : setTheme("dark")}>
        <ThemeIcon currentTheme={resolvedTheme as Theme} />
      </Button>
    </div>
  );
};