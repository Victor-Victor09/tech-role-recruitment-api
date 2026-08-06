/**
 *   Wires auth URLs + verbs to auth.controller.js. No logic here.
 *
 * Build this file to:
 *   - POST /register -> validate(authValidator.register), authController.register
 *   - POST /login -> validate(authValidator.login), authController.login
 *
 * Depends on / imports from:
 *   - src/controllers/auth.controller.js
 *   - src/middleware/validate.middleware.js
 *   - src/validators/auth.validator.js
 *
 */

import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validate(registerValidator), authController.register);
router.post("/login", validate(loginValidator), authController.login);

export default router;