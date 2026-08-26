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