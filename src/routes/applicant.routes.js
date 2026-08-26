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