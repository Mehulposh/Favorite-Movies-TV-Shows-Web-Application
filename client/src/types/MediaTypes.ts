// src/types.ts

/**
 * Represents the type of media content.
 * Matches the `MediaType` enum defined in the Prisma schema.
 */
export type MediaType = 'MOVIE' | 'TV_SHOW';

/**
 * Represents a single media entry (e.g., a movie or TV show).
 * This interface mirrors the structure of the `Media` model in the Prisma schema,
 * and is used across the frontend for displaying and managing media data.
 *
 * Note: All fields that are optional in the database (`?` in Prisma) are marked as optional here.
 */
export interface MediaItem {
  /**
   * Unique identifier assigned by the database.
   * Optional when creating a new item (not yet saved).
   */
  id: number;
 
  //Title of movie or tv show    
  title: string;

  //Type of media: either 'MOVIE' or 'TV_SHOW'.
  type: MediaType;

  //Name of director (required)
  director: string;

  //Budget ammount as numeric value
  budget?: number;

  /**
   * Human-readable unit for the budget.
   * Expected values: "thousand", "million", or "billion".
   * Used in combination with `budget` to display formatted values like "150 million".
   */
  budgetLabel?: string;

  //Primary filming location
  location?: string;

  //Duration of media in minutes
  durationMin?: number;

  //Release year
  year?: string;

  //Additional personal notes or comments about the media
  notes?: string;

  //URL to the poster image (optional)
  posterUrl?: string;

  /**
   * ISO 8601 timestamp when the record was created (e.g., "2025-10-27T10:30:00.000Z").
   * May be undefined for new or unsaved items.
   */
  createdAt?: string; 

  /**
   * ISO 8601 timestamp when the record was last updated.
   * May be undefined for new or unsaved items.
   */
  updatedAt?: string;
}