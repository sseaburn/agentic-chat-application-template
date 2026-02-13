"use client";

import { Landmark } from "lucide-react";

import { useHistoricalFigure } from "@/hooks/use-historical-figure";

import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { HistoricalFigureCard, HistoricalFigureCardSkeleton } from "./historical-figure-card";

export function ChatLayout() {
  const { result, isLoading, generate } = useHistoricalFigure();

  return (
    <div className="flex h-screen">
      <div className="chat-gradient-bg flex flex-1 flex-col">
        <ChatHeader />

        <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto">
          {isLoading ? (
            <HistoricalFigureCardSkeleton />
          ) : result ? (
            <HistoricalFigureCard
              name={result.name}
              biography={result.biography}
              imageBase64={result.imageBase64}
              mimeType={result.mimeType}
            />
          ) : (
            <div className="flex flex-col items-center gap-4 p-8">
              <div className="bg-primary/10 flex size-16 items-center justify-center rounded-2xl">
                <Landmark className="text-primary size-8" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">Discover Historical Figures</h2>
                <p className="text-muted-foreground mt-1 max-w-md text-sm">
                  Enter the name of any historical figure below to generate a portrait and biography
                  powered by Gemini AI.
                </p>
              </div>
            </div>
          )}
        </div>

        <ChatInput onSend={generate} disabled={isLoading} />
      </div>
    </div>
  );
}
