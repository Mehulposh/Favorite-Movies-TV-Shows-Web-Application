import prisma from "../prismaClient/prismaClient";
import { z } from "zod";
import { createMediaSchema, updateMediaSchema } from "../validators/mediaValidators";

type CreateMediaInput = z.infer<typeof createMediaSchema>;
type UpdateMediaInput = z.infer<typeof updateMediaSchema>;

export async function createMedia(data: CreateMediaInput) {
  return await prisma.media.create({ data });
}

export async function getMediaList(page: number, limit: number) {
  const skip = (page - 1) * limit;
  
  const [total, items] = await Promise.all([
    prisma.media.count(),
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },
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

export async function updateMedia(id: number, data: UpdateMediaInput) {
  return await prisma.media.update({
    where: { id },
    data
  });
}

export async function deleteMedia(id: number) {
  return await prisma.media.delete({ where: { id } });
}