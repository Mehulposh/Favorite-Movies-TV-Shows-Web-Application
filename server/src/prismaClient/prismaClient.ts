//src/prismaClient/prismaClient.ts

import { PrismaClient } from "@prisma/client";


/**
 * Prisma Client Instance
 * 
 * This module exports a singleton instance of PrismaClient for database operations.
 * 
 * Benefits of using a singleton:
 * - Prevents multiple database connection pools from being created
 * - Ensures consistent database connection management across the application
 * - Reduces memory overhead and connection exhaustion
 * 
 * Usage:
 * Import this instance throughout the application instead of creating new PrismaClient instances
 * 
 * Example:
 * import prisma from "./prismaClient/prismaClient";
 * const users = await prisma.user.findMany();
 */
const prisma = new PrismaClient();

// Export the singleton Prisma Client instance for application-wide use
export default prisma;