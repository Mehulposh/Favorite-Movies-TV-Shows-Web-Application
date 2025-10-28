import { z } from "zod";

/**
 * Media Validation Schemas
 * 
 * Zod schemas for validating media-related data.
 * These schemas ensure type safety and data integrity at runtime.
 * 
 * Benefits:
 * - Runtime validation of incoming data
 * - Automatic TypeScript type inference
 * - Detailed error messages for invalid data
 * - Centralized validation rules
 */

/**
 * Schema for creating a new media record
 * 
 * Required fields:
 * - title: Non-empty string representing the media title
 * - type: Either "MOVIE" or "TV_SHOW"
 * - director: Non-empty string for the director's name
 * 
 * Optional fields:
 * - budget: Numeric value for production budget
 * - budgetLabel: Human-readable budget description (e.g., "$50M")
 * - location: Filming location or production location
 * - durationMin: Runtime in minutes (must be a positive integer)
 * - year: Release year as a string
 * - notes: Additional notes or comments about the media
 * - posterUrl: Valid URL string for the media poster image
 */
export const createMediaSchema = z.object({
  title: z.string().min(1),// Must be non-empty
  type: z.enum(["MOVIE", "TV_SHOW"]),  // Restricted to these two media types
  director: z.string().min(1),  // Must be non-empty
  budget: z.number().optional(),  // Numeric budget value
  budgetLabel: z.string().optional(), // Human-readable budget
  location: z.string().optional(),  // Filming or production location
  durationMin: z.number().int().positive().optional(),  // Must be positive integer if provided
  year: z.string().optional(),  // Release year
  notes: z.string().optional(), //Additional Notes
  posterUrl: z.string().url().optional()  // Must be valid URL format if provided
});


/**
 * Schema for updating an existing media record
 * 
 * Uses the same fields as createMediaSchema but makes all fields optional.
 * This allows partial updates where only specific fields need to be changed.
 * 
 * Example: Update only the title without providing all other fields
 */
export const updateMediaSchema = createMediaSchema.partial();
