import app from './src/app.js';
import sequelize from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;


async function startServer() {





/**
 * server.js
 * ------------------------------------------------------------
 * Owner : Person A — Foundation & Auth
 * Layer : entry
 *
 * Responsibility:
 *   Starts the HTTP server. Keeping this separate from app.js means tests can import app.js directly without opening a real port.
 *
 * Build this file to:
 *   - Import app from ./src/app.js
 *   - Import config from ./src/config/env.js
 *   - app.listen(config.port, () => logger.info(...))
 *
 * Depends on / imports from:
 *   - src/app.js
 *   - src/config/env.js
 *   - src/utils/logger.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 10 (Routes & Entry File)
 */

// TODO: implement
