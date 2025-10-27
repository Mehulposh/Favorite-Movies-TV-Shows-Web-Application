import { Request, Response } from "express";
import { z } from "zod";
import * as mediaService from "../services/mediaServices";
import { createMediaSchema, updateMediaSchema } from "../validators/mediaValidators";

export async function createMedia(req: Request, res: Response) {
  try {
    const parsed = createMediaSchema.parse(req.body);
    const media = await mediaService.createMedia(parsed);
    res.status(201).json(media);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getMediaList(req: Request, res: Response) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 20);
    
    const result = await mediaService.getMediaList(page, limit);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function updateMedia(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const parsed = updateMediaSchema.parse(req.body);
    
    const updated = await mediaService.updateMedia(id, parsed);
    res.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteMedia(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await mediaService.deleteMedia(id);
    res.status(204).send(null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}