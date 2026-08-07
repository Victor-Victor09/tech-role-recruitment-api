import { Router } from "express";
import * as employerController from "../controllers/employer.controller.js";
import {authMiddleware as auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createProfileValidator, updateProfileValidator } from "../validators/employer.validator.js";

const router = Router();

router.post("/profile", auth, requireRole("employer"), validate(createProfileValidator), employerController.createProfile);
router.get("/profile", auth, requireRole("employer"), employerController.getProfile);
router.patch("/profile", auth, requireRole("employer"), validate(updateProfileValidator), employerController.updateProfile);

export default router;
