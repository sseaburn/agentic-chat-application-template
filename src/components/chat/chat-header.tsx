"use client";

import { Landmark } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

export function ChatHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Landmark className="text-primary size-5" />
        <h1 className="text-lg font-semibold">Historical Figure Generator</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
