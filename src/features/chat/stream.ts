/**
 * @deprecated This module used the OpenRouter API which has been replaced by Gemini.
 * Kept for reference. The active LLM integration is in src/features/historical-figures/.
 */
import { getLogger } from "@/core/logging";

import { MAX_CONTEXT_MESSAGES, SYSTEM_PROMPT } from "./constants";
import { OpenRouterError } from "./errors";
import type { Message } from "./models";

const logger = getLogger("chat.stream");

export function buildMessages(history: Message[]): Array<{ role: string; content: string }> {
  const limitedHistory = history.slice(-MAX_CONTEXT_MESSAGES);
  return [
    { role: "system", content: SYSTEM_PROMPT },
    ...limitedHistory.map((m) => ({ role: m.role, content: m.content })),
  ];
}

export async function streamChatCompletion(
  _history: Message[],
  _signal?: AbortSignal,
): Promise<{ stream: ReadableStream; fullResponse: Promise<string> }> {
  logger.warn("stream.deprecated", "streamChatCompletion is deprecated — use Gemini integration");
  throw new OpenRouterError(
    "OpenRouter integration has been replaced by Gemini. Use /api/historical-figure instead.",
  );
}
