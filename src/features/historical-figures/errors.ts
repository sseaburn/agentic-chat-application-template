export type HistoricalFigureErrorCode =
  | "GEMINI_ERROR"
  | "IMAGE_GENERATION_ERROR"
  | "INVALID_RESPONSE";

export class HistoricalFigureError extends Error {
  readonly code: HistoricalFigureErrorCode;
  readonly statusCode: number;

  constructor(message: string, code: HistoricalFigureErrorCode, statusCode: number) {
    super(message);
    this.name = "HistoricalFigureError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class GeminiError extends HistoricalFigureError {
  constructor(message: string) {
    super(`Gemini API error: ${message}`, "GEMINI_ERROR", 502);
  }
}

export class ImageGenerationError extends HistoricalFigureError {
  constructor(name: string) {
    super(
      `Failed to generate image for "${name}". The model may not have produced an image.`,
      "IMAGE_GENERATION_ERROR",
      422,
    );
  }
}

export class InvalidResponseError extends HistoricalFigureError {
  constructor(name: string) {
    super(
      `Received an invalid response for "${name}". Missing biography or image.`,
      "INVALID_RESPONSE",
      422,
    );
  }
}
