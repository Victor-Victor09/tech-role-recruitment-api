import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { authRateLimiter } from "../middleware/rateLimit.middleware.js";

const router = Router();

router.post("/register", authRateLimiter, validate(registerValidator), authController.register);
router.post("/login", authRateLimiter, validate(loginValidator), authController.login);

export default router;