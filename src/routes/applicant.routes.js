/**
 * src/routes/applicant.routes.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : route
 *
 * Responsibility:
 *   Wires applicant profile URLs. All routes require auth + role('applicant').
 *
 * Build this file to:
 *   - POST /profile -> auth, role('applicant'), validate(applicantValidator), applicantController.createProfile
 *   - GET /profile -> auth, role('applicant'), applicantController.getProfile
 *   - PATCH /profile -> auth, role('applicant'), applicantController.updateProfile
 *   - POST /profile/resume -> auth, role('applicant'), uploadResume (upload.middleware.js), applicantController.uploadResume
 *
 * Depends on / imports from:
 *   - src/controllers/applicant.controller.js
 *   - src/middleware/auth.middleware.js
 *   - src/middleware/role.middleware.js
 *   - src/middleware/upload.middleware.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 10 (Routes & Entry File)
 */

// TODO: implement

import { Router } from "express";
import * as applicantController from "../controllers/applicant.controller.js";
import { authMiddleware as auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createProfileValidator, updateProfileValidator } from "../validators/applicant.validator.js";
import { uploadResume } from "../middleware/upload.middleware.js";
import { writeActionRateLimiter } from "../middleware/rateLimit.middleware.js";
import { APPLICANT } from "../constants/roles.js";

const router = Router();

router.post(
    "/profile",
    writeActionRateLimiter,
    auth,
    requireRole(APPLICANT),
    validate(createProfileValidator),
    applicantController.createProfile
);

router.get("/profile", writeActionRateLimiter, auth, requireRole(APPLICANT), applicantController.getProfile);

router.patch(
    "/profile",
    writeActionRateLimiter,
    auth,
    requireRole(APPLICANT),
    validate(updateProfileValidator),
    applicantController.updateProfile
);

// uploadResume (multer) must run before the controller so req.file is
// populated by the time uploadResume the controller function runs.
router.post(
    "/profile/resume",
    writeActionRateLimiter,
    auth,
    requireRole(APPLICANT),
    uploadResume,
    applicantController.uploadResume
);

export default router;