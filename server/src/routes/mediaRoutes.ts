//src/routes/mediaRoutes

import { Router } from "express";
import {
  createMedia,
  getMediaList,
  updateMedia,
  deleteMedia
} from "../controllers/mediaController";

// Initialize Express router for media-related endpoints
const router = Router();


/**
 * Media Routes
 * 
 * This router handles all media-related operations including:
 * - Creating new media records
 * - Retrieving paginated media lists
 * - Updating existing media records
 * - Deleting media records
 */

/**
 * POST /newMedia
 * Creates a new media record
 * 
 * Request body should contain media data validated by createMediaSchema
 * Returns the newly created media record with HTTP 201 status
 */
router.post("/newMedia", createMedia);


/**
 * GET /getMedia
 * Retrieves a paginated list of media records
 * 
 * Query parameters:
 * - page (optional): Page number, defaults to 1
 * - limit (optional): Items per page, defaults to 10
 * 
 * Returns paginated response with total count and media items
 */
router.get("/getMedia", getMediaList);

/**
 * PUT /update/:id
 * Updates an existing media record
 * 
 * URL parameters:
 * - id: The numeric ID of the media record to update
 * 
 * Request body should contain partial media data validated by updateMediaSchema
 * Returns the updated media record
 */
router.put("/update/:id", updateMedia);

/**
 * DELETE /delete/:id
 * Deletes a media record from the database
 * 
 * URL parameters:
 * - id: The numeric ID of the media record to delete
 * 
 * Returns the deleted media record with HTTP 200 status
 */
router.delete("/delete/:id", deleteMedia);


// Export the configured router for use in the main application

export default router;