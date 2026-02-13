import { z } from "zod/v4";

export const GenerateFigureSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less")
    .trim(),
});

export type GenerateFigureInput = z.infer<typeof GenerateFigureSchema>;
