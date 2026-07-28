/**
 * src/config/env.js
 * ------------------------------------------------------------
 * Owner : Person A — Foundation & Auth
 * Layer : config
 *
 * Responsibility:
 *   Read process.env exactly once, validate required keys exist, and export
 *   a single frozen config object. Nothing else in the app should touch
 *   process.env directly.
 *
 * Build this file to:
 *   - Load dotenv at the very top (require('dotenv').config())
 *   - Read PORT, DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV
 *   - Throw a clear error and exit if a required var (DATABASE_URL, JWT_SECRET) is missing
 *   - Export a single config object, e.g. module.exports = { port, databaseUrl, jwtSecret, jwtExpiresIn, nodeEnv }
 *
 * Depends on / imports from:
 *   - dotenv
 *   - .env / .env.example
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 6 (Configuration Files & Folders)
 */

// TODO: implement
