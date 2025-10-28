import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateMedia, useUpdateMedia } from "../hooks/MediaHooks";

const mediaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["MOVIE", "TV_SHOW"]),
  director: z.string().min(1, "Director is required"),
  budget: z.number().optional(),
  budgetLabel: z.string().optional(),
  location: z.string().optional(),
  durationMin: z.number().int().positive().optional(),
  year: z.string().optional(),
  notes: z.string().optional(),
  posterUrl: z.string().url("Must be a valid URL").optional().or(z.literal(""))
});

type MediaFormValues = z.infer<typeof mediaSchema>;

// Extended type to include id for editing
interface MediaFormProps {
  defaultValues?: Partial<MediaFormValues> & { id?: number };
  onClose?: () => void;
}

export function MediaForm({ defaultValues, onClose }: MediaFormProps) {
  const createMutation = useCreateMedia();
  const updateMutation = useUpdateMedia();

  const { register, handleSubmit, formState: { errors } } = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues
  });

  const onSubmit = (data: MediaFormValues) => {
    if (defaultValues?.id) {
      updateMutation.mutate({ id: defaultValues.id, data });
    } else {
      createMutation.mutate(data);
    }
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {defaultValues?.id ? "Edit Media" : "Add New Media"}
      </h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register("title")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter title"
        />
        {errors.title && (
          <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type <span className="text-red-500">*</span>
        </label>
        <select
          {...register("type")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MOVIE">Movie</option>
          <option value="TV_SHOW">TV Show</option>
        </select>
        {errors.type && (
          <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
        )}
      </div>

      {/* Director */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Director <span className="text-red-500">*</span>
        </label>
        <input
          {...register("director")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter director name"
        />
        {errors.director && (
          <p className="text-sm text-red-600 mt-1">{errors.director.message}</p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Budget
        </label>
        <input
          {...register("budget", { valueAsNumber: true })}
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter budget"
        />
        {errors.budget && (
          <p className="text-sm text-red-600 mt-1">{errors.budget.message}</p>
        )}
      </div>

      {/* Budget Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Budget Label
        </label>
        <input
          {...register("budgetLabel")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Million USD"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          {...register("location")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Filming location"
        />
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duration (minutes)
        </label>
        <input
          {...register("durationMin", { valueAsNumber: true })}
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Runtime in minutes"
        />
        {errors.durationMin && (
          <p className="text-sm text-red-600 mt-1">{errors.durationMin.message}</p>
        )}
      </div>

      {/* Year */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Year
        </label>
        <input
          {...register("year")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Release year"
        />
      </div>

      {/* Poster URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Poster URL
        </label>
        <input
          {...register("posterUrl")}
          type="url"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/poster.jpg"
        />
        {errors.posterUrl && (
          <p className="text-sm text-red-600 mt-1">{errors.posterUrl.message}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          {...register("notes")}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Additional notes..."
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : "Save"}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Error Messages */}
      {(createMutation.isError || updateMutation.isError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          Failed to save media. Please try again.
        </div>
      )}
    </form>
  );
}