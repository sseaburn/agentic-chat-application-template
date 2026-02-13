import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { handleApiError } from "@/core/api/errors";
import { getLogger } from "@/core/logging";
import { GenerateFigureSchema, generateHistoricalFigure } from "@/features/historical-figures";

const logger = getLogger("api.historical-figure");

/**
 * POST /api/historical-figure
 * Generate a portrait and biography for a historical figure.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = GenerateFigureSchema.parse(body);

    logger.info({ name }, "historical_figure.request_started");

    const result = await generateHistoricalFigure(name);

    logger.info({ name }, "historical_figure.request_completed");

    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
