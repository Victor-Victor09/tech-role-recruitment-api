import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: console.log,
    }
);

export default sequelize;




/**
 * src/config/db.js
 * ------------------------------------------------------------
 * Owner : Person A — Foundation & Auth
 * Layer : config
 *
 * Responsibility:
 *   Create and export the single initialized Sequelize instance. Every
 *   model file imports this to define itself — no model creates its own connection.
 *
 * Build this file to:
 *   - Import config from ./env.js
 *   - const { Sequelize } = require('sequelize')
 *   - Create: new Sequelize(config.databaseUrl, { dialect: 'postgres', logging: false })
 *   - Export the instance as the module's default export
 *   - Optional: call sequelize.authenticate() once at startup and log success/failure
 *
 * Depends on / imports from:
 *   - src/config/env.js
 *   - sequelize
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 6 (Configuration Files & Folders)
 */

// TODO: implement