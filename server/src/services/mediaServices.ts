//src/services/mediaServices
//Creates all the required services 
import prisma from "../prismaClient/prismaClient";
import { z } from "zod";
import { createMediaSchema, updateMediaSchema } from "../validators/mediaValidators";

// Infer TypeScript types from Zod schemas for type safety
type CreateMediaInput = z.infer<typeof createMediaSchema>;
type UpdateMediaInput = z.infer<typeof updateMediaSchema>;


/**
 * Creates a new media record in the database
 * @param data - The media data to create, validated against createMediaSchema
 * @returns The newly created media record
 */
export async function createMediaInDB(data: CreateMediaInput) {
  console.log('Data',data);
  
  return await prisma.media.create({ data });
}


/**
 * Retrieves a paginated list of media records
 * @param page - The page number to retrieve (1-indexed)
 * @param limit - The number of items per page
 * @returns An object containing pagination metadata and the media items
 */
export async function getMediaList(page: number, limit: number) {
  // Calculate the number of records to skip based on current page
  const skip = (page - 1) * limit;
  
  // Fetch total count and paginated items in parallel for better performance
  const [total, items] = await Promise.all([
    prisma.media.count(),
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },// Sort by newest first
      skip,
      take: limit
    })
  ]);

  return {
    page,
    limit,
    total,
    items
  };
}

/**
 * Updates an existing media record
 * @param id - The ID of the media record to update
 * @param data - The updated media data, validated against updateMediaSchema
 * @returns The updated media record
 */
export async function updateMedia(id: number, data: UpdateMediaInput) {
  return await prisma.media.update({
    where: { id },
    data
  });
}


/**
 * Deletes a media record from the database
 * @param id - The ID of the media record to delete
 * @returns The deleted media record
 */
export async function deleteMedia(id: number) {
  return await prisma.media.delete({ where: { id } });
}