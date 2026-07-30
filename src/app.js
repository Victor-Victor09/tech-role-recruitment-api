import express from "express";
//import sequelize from "./config/db.config.js";

const app = express();
//const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ status: "success", message: "Welcome to the Tech Role Recruiting Platform!" });
});

export default app;



/**
 * src/app.js
 * ------------------------------------------------------------
 * Owner : Person A — Foundation & Auth
 * Layer : entry (express app only — NO app.listen())
 *
 * Responsibility:
 *   Builds and exports the Express app. server.js is the only file that calls .listen().
 *
 * Build this file to:
 *   - Create the express app
 *   - Apply express.json(), express.urlencoded({ extended: true }), cors()
 *   - Mount routes/index.js under /api
 *   - Mount error.middleware.js LAST, after all routes
 *   - module.exports = app
 *
 * Depends on / imports from:
 *   - express
 *   - cors
 *   - src/routes/index.js
 *   - src/middleware/error.middleware.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 10 (Routes & Entry File)
 */

// TODO: implement
