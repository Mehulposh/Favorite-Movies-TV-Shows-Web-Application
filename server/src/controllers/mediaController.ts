import { Request, Response } from "express";
import { z } from "zod";
import * as mediaService from "../services/mediaServices";
import { createMediaSchema, updateMediaSchema } from "../validators/mediaValidators";


/**
 * Media Controller
 * 
 * Handles HTTP requests for media-related operations.
 * Responsible for:
 * - Request validation using Zod schemas
 * - Coordinating with the media service layer
 * - Sending appropriate HTTP responses
 * - Error handling and response formatting
 */

/**
 * Creates a new media record
 * 
 * POST /newMedia
 * 
 * @param req - Express request object containing media data in body
 * @param res - Express response object
 * @returns HTTP 201 with created media record, or 400/500 on error
 */
export async function createMedia(req: Request, res: Response) {
  // Debug logging to inspect incoming request data
   console.log('Received body:', req.body);
  console.log('Type of body:', typeof req.body); // 🔍 Add this
  console.log('Is plain object?', req.body.constructor === Object); 

  const rawBody = req.body;
  // Clean empty strings from the request body
  // Converts empty strings to undefined to match schema expectations
  const cleanedBody = {
    ...rawBody,
    posterUrl: rawBody.posterUrl === '' ? undefined : rawBody.posterUrl,
     // Additional empty string cleaning can be added here if needed
  };

  try {
    // Validate request body against createMediaSchema
    const parsed = createMediaSchema.parse(cleanedBody);
    console.log(parsed);
    
    // Create media record in the database
    const media = await mediaService.createMediaInDB(parsed);
    console.log(media);
    
    // Return created media with 201 Created status
    res.status(201).json(media);
  } catch (err) {
    // Handle validation errors with detailed error messages
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    // Handle unexpected server errors
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}


/**
 * Retrieves a paginated list of media records
 * 
 * GET /getMedia
 * 
 * @param req - Express request object with optional query params (page, limit)
 * @param res - Express response object
 * @returns HTTP 200 with paginated media data, or 500 on error
 * 
 * Query parameters:
 * - page: Page number (default: 1, minimum: 1)
 * - limit: Items per page (default: 20, maximum: 100)
 */
export async function getMediaList(req: Request, res: Response) {
  
  try {
    // Parse and sanitize pagination parameters with safe defaults
    // Ensures page is at least 1 and limit doesn't exceed 100
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 20);
    
    // Fetch paginated media list from service layer
    const result = await mediaService.getMediaList(page, limit);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}


/**
 * Updates an existing media record
 * 
 * PUT /update/:id
 * 
 * @param req - Express request object with media ID in params and update data in body
 * @param res - Express response object
 * @returns HTTP 200 with updated media record, or 400/500 on error
 */
export async function updateMedia(req: Request, res: Response) {
  try {
     // Extract media ID from URL parameters
    const id = Number(req.params.id);

    // Validate update data against updateMediaSchema
    const parsed = updateMediaSchema.parse(req.body);
    
    // Update media record in the database
    const updated = await mediaService.updateMedia(id, parsed);
    res.json(updated);
  } catch (err) {
    // Handle validation errors with detailed error messages
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    // Handle unexpected server errors
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}


/**
 * Deletes a media record from the database
 * 
 * DELETE /delete/:id
 * 
 * @param req - Express request object with media ID in params
 * @param res - Express response object
 * @returns HTTP 204 on successful deletion, or 500 on error
 */
export async function deleteMedia(req: Request, res: Response) {
  try {
    // Extract media ID from URL parameters
    const id = Number(req.params.id);

     // Delete media record from the database
    await mediaService.deleteMedia(id);

    // Return 204 No Content status (successful deletion with no response body)
    res.status(204).send(null);
  } catch (err) {
    // Handle unexpected server errors
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}