// src/hooks/MediaHooks.ts
// Custom React Query hooks for managing media data (movies & TV shows)
// Handles fetching, creating, updating, and deleting media items with automatic cache invalidation

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/apiClient";

// Number of items to load per page in infinite scrolling
const PAGE_SIZE = 10;


// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Represents a single media item (movie or TV show).
 * Mirrors the structure returned by the backend API.
 */
interface MediaItem {
  id: number;
  title: string;
  type: "MOVIE" | "TV_SHOW";
  director: string;
  budget?: number;           // Numeric value (e.g., 150 = 150 million)
  budgetLabel?: string;      // Unit: "thousand", "million", or "billion"
  location?: string;         
  durationMin?: number;       // Duration in minutes
  year?: string;              // e.g., "2010" or "2008-2013"
  notes?: string;
  posterUrl?: string;
  createdAt?: string;         // ISO 8601 timestamp
  updatedAt?: string;         // ISO 8601 timestamp
}


/**
 * Response structure for paginated media list API endpoint.
 */
interface MediaListResponse {
  page: number;           // Current page number (1-based)
  limit: number;          // Number of items per page
  total: number;          // Total number of items in the database
  items: MediaItem[];     // Array of media items for this page
}

/**
 * Payload shape for creating a new media item.
 * All required fields from Prisma schema are included.
 */
interface CreateMediaPayload {
  title: string;
  type: "MOVIE" | "TV_SHOW";
  director: string;
  budget?: number;
  budgetLabel?: string;
  location?: string;
  durationMin?: number;
  year?: string;
  notes?: string;
  posterUrl?: string;
}

/**
 * Payload shape for updating an existing media item.
 */
interface UpdateMediaPayload {
  id: number;
  data: Partial<MediaItem>;
}


// =============================================================================
// Query & Mutation Hooks
// =============================================================================

/**
 * Fetches media items with infinite scroll pagination.
 * Automatically handles loading more data when scrolling near the bottom.
 * 
 * @returns Infinite query result with pages of media items
 */
export function useMediaList() {
  return useInfiniteQuery({
    queryKey: ["mediaList"],
    // Fetch a single page of data
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get<MediaListResponse>("/getMedia", {
        params: { page: pageParam, limit: PAGE_SIZE }
      });
      return res.data;
    },
    // Determine if there's a next page to load
    getNextPageParam: (lastPage: MediaListResponse) => {
      const { page, limit, total } = lastPage;
      const maxPage = Math.ceil(total / limit);
      return page < maxPage ? page + 1 : undefined;
    },
    initialPageParam: 1
  });
}


/**
 * Creates a new media item.
 * On success, invalidates the media list cache to reflect the new item.
 * 
 * @returns Mutation hook for creating media
 */
export function useCreateMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMediaPayload) => api.post("/newMedia", payload),
    onSuccess: () => {
      // Refetch all media-related queries to show the new item
      qc.invalidateQueries({ queryKey: ["mediaList"] });
    }
  });
}


/**
 * Updates an existing media item.
 * On success, refreshes the media list to reflect changes.
 * 
 * @returns Mutation hook for updating media
 */
export function useUpdateMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: UpdateMediaPayload) => 
      api.put(`/update/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mediaList"] });
    }
  });
}


/**
 * Deletes a media item by ID.
 * On success, removes the item from the UI by refreshing the list.
 * 
 * @returns Mutation hook for deleting media
 */
export function useDeleteMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/delete/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mediaList"] });
    }
  });
}