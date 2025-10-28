// src/index.ts
// Main entry point for the Express server
// Sets up middleware, routes, and starts the HTTP server
import cors from  'cors';
import express, { Request, Response } from 'express';
import mediaRoutes from "./routes/mediaRoutes"
import dotenv from "dotenv";

// Load environment variables from .env file into process.env
dotenv.config();

// Create Express application instance
const app = express();

// Define the port the server will listen on
// Use PORT from environment (e.g., for deployment) or default to 5000 for local development
const PORT = process.env.PORT || 5000;


// =============================================================================
// Middleware Setup
// =============================================================================

// Enable Cross-Origin Resource Sharing (CORS)
// Allows frontend (e.g., React app on http://localhost:5173) to call this API
app.use(cors());

// Parse incoming JSON requests
// This replaces the need for `body-parser`; built into Express since v4.16
app.use(express.json());


// =============================================================================
// Route Registration
// =============================================================================

// Mount media-related routes under the `/api/media` path
// All routes defined in `mediaRoutes` will be prefixed with `/api/media`
app.use("/api/media", mediaRoutes);

// Root endpoint for health check or basic info
app.get("/", (req, res) => res.send("Favorite Media API"));


// =============================================================================
// Server Startup
// =============================================================================

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});