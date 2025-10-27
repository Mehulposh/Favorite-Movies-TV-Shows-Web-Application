import { z } from "zod";

export const createMediaSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["MOVIE", "TV_SHOW"]),
  director: z.string().min(1),
  budget: z.number().optional(),
  budgetLabel: z.string().optional(),
  location: z.string().optional(),
  durationMin: z.number().int().positive().optional(),
  year: z.string().optional(),
  notes: z.string().optional(),
  posterUrl: z.string().url().optional()
});

export const updateMediaSchema = createMediaSchema.partial();
