import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/apiClient";

const PAGE_SIZE = 20;

// Define types for better type safety
interface MediaItem {
  id: number;
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
  createdAt?: string;
  updatedAt?: string;
}

interface MediaListResponse {
  page: number;
  limit: number;
  total: number;
  items: MediaItem[];
}

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

interface UpdateMediaPayload {
  id: number;
  data: Partial<MediaItem>;
}

export function useMediaList() {
  return useInfiniteQuery({
    queryKey: ["mediaList"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get<MediaListResponse>("/getMedia", {
        params: { page: pageParam, limit: PAGE_SIZE }
      });
      return res.data;
    },
    getNextPageParam: (lastPage: MediaListResponse) => {
      const { page, limit, total } = lastPage;
      const maxPage = Math.ceil(total / limit);
      return page < maxPage ? page + 1 : undefined;
    },
    initialPageParam: 1
  });
}

export function useCreateMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMediaPayload) => api.post("/newMedia", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mediaList"] });
    }
  });
}

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

export function useDeleteMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/delete/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mediaList"] });
    }
  });
}