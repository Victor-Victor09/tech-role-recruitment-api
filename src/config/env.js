import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

for(const key of requiredEnvVars) {
    if (!process.env[key]) {
        console.error(`Missing required environment variable: ${key}`);
        process.exit(1);
    }
}

const config = {
    port: process.env.PORT || 5000,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    nodeEnv: process.env.NODE_ENV || 'development'
};

export default config;

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
 *   - Load dotenv at the very top (import ('dotenv').config())
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
