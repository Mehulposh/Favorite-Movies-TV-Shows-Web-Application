// src/types.ts
export type MediaType = 'MOVIE' | 'TV_SHOW';

export interface MediaItem {
  id: number;
  title: string;
  type: MediaType;
  director: string;
  budget?: number;
  budgetLabel?: string;
  location?: string;
  durationMin?: number;
  year?: string;
  notes?: string;
  posterUrl?: string;
  createdAt?: string; // ISO string
  updatedAt?: string;
}