import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import errorMiddleware from "./middleware/error.middleware.js";
//import sequelize from "./config/db.config.js";

const app = express();
//const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ status: "success", message: "Welcome to the Tech Role Recruiting Platform!" });
});

app.use("/api", router);

// Error handling middleware (should be the last middleware)
app.use(errorMiddleware);


export default app;



/**
 *  This file builds and exports the Express app. server.js is the only file that calls .listen().
 *
 *  Build this file to:
 *   - Create the express app
 *   - Apply express.json(), express.urlencoded({ extended: true }), cors()
 *   - Mount routes/index.js under /api
 *   - Mount error.middleware.js LAST, after all routes
 *   - exports defaultapp
 *
 * Depends on / imports from:
 *   - express
 *   - cors
 *   - src/routes/index.js
 *   - src/middleware/error.middleware.js
 */
