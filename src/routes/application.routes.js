/**
 * src/routes/application.routes.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : route
 *
 * Responsibility:
 *   Wires application URLs. Applying/viewing/cancelling is applicant-only; status updates and the employer list are employer-only.
 *
 * Build this file to:
 *   - POST / -> auth, role('applicant'), validate(applicationValidator), applicationController.applyToJob
 *   - GET /:id -> auth, applicationController.getById
 *   - PATCH /:id -> auth, role('applicant'), applicationController.update
 *   - DELETE /:id -> auth, role('applicant'), applicationController.cancel
 *   - GET /applicant/me -> auth, role('applicant'), applicationController.listForApplicant
 *   - GET /employer/me -> auth, role('employer'), applicationController.listForEmployer
 *   - PATCH /:id/status -> auth, role('employer'), applicationController.updateStatus
 *
 * Depends on / imports from:
 *   - src/controllers/application.controller.js
 *   - src/middleware/auth.middleware.js
 *   - src/middleware/role.middleware.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 10 (Routes & Entry File)
 */

// TODO: implement
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
router.get("/applicant/me", auth, requireRole(APPLICANT), applicationController.listForApplicant);
router.get("/employer/me", auth, requireRole(EMPLOYER), applicationController.listForEmployer);

router.get("/:id", auth, applicationController.getById);

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
