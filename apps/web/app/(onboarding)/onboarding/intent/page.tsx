"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@linktree/ui/button";
import {
  Briefcase,
  LayoutDashboard,
  CreditCard,
  Zap,
  Code2,
  Brain,
  Check,
} from "lucide-react";

const OPTIONS = [
  {
    id: "work",
    title: "Work Stuff",
    description: "Just the usual boring work stuff I guess.",
    icon: Briefcase,
  },
  {
    id: "uiux",
    title: "UI / UX Design",
    description: "Design pages and prototypes.",
    icon: LayoutDashboard,
  },
  {
    id: "finance",
    title: "Finance",
    description: "Because I need money to live my life?",
    icon: CreditCard,
  },
  {
    id: "productivity",
    title: "Productivity",
    description: "Sometimes we need to be productive.",
    icon: Zap,
  },
  {
    id: "engineering",
    title: "Engineering",
    description: "Build apps and MVPs with code.",
    icon: Code2,
  },
  {
    id: "ml",
    title: "Machine Learning",
    description: "ML, AI, and other robot stuff.",
    icon: Brain,
  },
];

export default function IntentPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    localStorage.setItem("onboarding-intent", selected);
    router.push("/onboarding/username");
  };

  return (
    <div className="w-full max-w-4xl px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">
          What are you planning to use OneURL for?
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          This helps us personalize your experience
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = selected === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`relative rounded-xl border bg-white p-5 text-left transition-all hover:border-zinc-900 hover:shadow-sm
                ${
                  isActive
                    ? "border-zinc-900 ring-2 ring-zinc-900"
                    : "border-zinc-200"
                }`}
            >
              {/* Check */}
              {isActive && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white">
                  <Check className="h-3 w-3" />
                </span>
              )}

              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
                <Icon className="h-5 w-5 text-zinc-700" />
              </div>

              <h3 className="text-sm font-semibold text-zinc-900">
                {option.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.back()}
        >
          Back
        </Button>

        <Button
          onClick={handleContinue}
          disabled={!selected}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
