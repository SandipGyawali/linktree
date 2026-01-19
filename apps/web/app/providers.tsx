"use client";
import { ThemeProvider } from "../components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, type ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export function Providers({ children }: ProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
