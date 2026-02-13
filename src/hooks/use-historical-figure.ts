"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

export interface HistoricalFigureResult {
  name: string;
  biography: string;
  imageBase64: string;
  mimeType: string;
}

export function useHistoricalFigure() {
  const [result, setResult] = useState<HistoricalFigureResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const generate = useCallback(async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    // Abort any in-flight request
    abortControllerRef.current?.abort();

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/historical-figure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
        signal: abortController.signal,
      });

      if (!res.ok) {
        const errorData = (await res.json().catch(() => null)) as {
          error?: { message?: string };
        } | null;
        const message = errorData?.error?.message ?? "Failed to generate historical figure";
        throw new Error(message);
      }

      const data = (await res.json()) as HistoricalFigureResult;
      setResult(data);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    abortControllerRef.current?.abort();
    setResult(null);
    setIsLoading(false);
  }, []);

  return { result, isLoading, generate, clear };
}
