import { Router } from "express";
import * as applicationController from "../controllers/application.controller.js";
import { authMiddleware as auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
    applyValidator,
    updateApplicationValidator,
    updateStatusValidator,
} from "../validators/application.validator.js";
import { writeActionRateLimiter } from "../middleware/rateLimit.middleware.js";
import { APPLICANT, EMPLOYER } from "../constants/roles.js";

const router = Router();

router.post(
    "/",
    writeActionRateLimiter,
    auth,
    requireRole(APPLICANT),
    validate(applyValidator),
    applicationController.applyToJob
);

// Fixed routes (applicant/me, employer/me) must be registered before
// the dynamic /:id route below — otherwise Express matches "me" as an
// :id param and both of these become unreachable.
router.get("/applicant/me", writeActionRateLimiter, auth, requireRole(APPLICANT), applicationController.listForApplicant);
router.get("/employer/me", writeActionRateLimiter, auth, requireRole(EMPLOYER), applicationController.listForEmployer);

router.get("/:id", writeActionRateLimiter, auth, applicationController.getById);

router.patch(
    "/:id",
    writeActionRateLimiter,
    auth,
    requireRole(APPLICANT),
    validate(updateApplicationValidator),
    applicationController.update
);

router.delete("/:id", writeActionRateLimiter, auth, requireRole(APPLICANT), applicationController.cancel);

router.patch(
    "/:id/status",
    writeActionRateLimiter,
    auth,
    requireRole(EMPLOYER),
    validate(updateStatusValidator),
    applicationController.updateStatus
);

export default router;
