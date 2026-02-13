import { GoogleGenAI } from "@google/genai";

import { env } from "@/core/config/env";
import { getLogger } from "@/core/logging";

import { GeminiError, ImageGenerationError, InvalidResponseError } from "./errors";

const logger = getLogger("historical-figures.service");

export interface HistoricalFigureResult {
  name: string;
  biography: string;
  imageBase64: string;
  mimeType: string;
}

const FIGURE_PROMPT = (name: string) =>
  `You are a historian and portrait artist. Generate a realistic, historically accurate painted portrait of ${name} and write a 200-300 word biography about them.

Requirements for the biography:
- Start with their full name and birth/death years
- Cover their most significant achievements and contributions
- Include interesting lesser-known facts
- Write in an engaging, accessible style
- Keep it between 200-300 words

Generate both the portrait image AND the biography text in your response.`;

export async function generateHistoricalFigure(name: string): Promise<HistoricalFigureResult> {
  logger.info({ name }, "historical_figure.generate_started");

  const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

  const response = await ai.models
    .generateContent({
      model: "gemini-2.5-flash-image",
      contents: FIGURE_PROMPT(name),
      config: {
        responseModalities: ["Text", "Image"],
      },
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      logger.error({ name, error: message }, "historical_figure.generate_failed");
      throw new GeminiError(message);
    });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts || parts.length === 0) {
    logger.error({ name }, "historical_figure.empty_response");
    throw new InvalidResponseError(name);
  }

  let biography = "";
  let imageBase64 = "";
  let mimeType = "image/png";

  for (const part of parts) {
    if (part.text) {
      biography += part.text;
    }
    if (part.inlineData) {
      imageBase64 = part.inlineData.data ?? "";
      mimeType = part.inlineData.mimeType ?? "image/png";
    }
  }

  biography = biography.trim();

  if (!biography) {
    logger.error({ name }, "historical_figure.no_biography");
    throw new InvalidResponseError(name);
  }

  if (!imageBase64) {
    logger.warn({ name }, "historical_figure.no_image");
    throw new ImageGenerationError(name);
  }

  logger.info(
    { name, biographyLength: biography.length, hasImage: true },
    "historical_figure.generate_completed",
  );

  return { name, biography, imageBase64, mimeType };
}
