/**
 *   Wires job listing URLs. Create/edit/delete are employer-only; search/list is open to any authenticated user.
 *
 * Build this file to:
 *   - POST / -> auth, role('employer'), validate(jobListingValidator), jobListingController.create
 *   - GET / -> auth, jobListingController.list (search/filter via query params)
 *   - GET /:id -> auth, jobListingController.getById
 *   - PATCH /:id -> auth, role('employer'), jobListingController.update
 *   - DELETE /:id -> auth, role('employer'), jobListingController.remove (soft delete)
 *
 * Depends on / imports from:
 *   - src/controllers/jobListing.controller.js
 *   - src/middleware/auth.middleware.js
 *   - src/middleware/role.middleware.js
 */
import { Router } from "express";
import * as jobListingController from "../controllers/jobListing.controller.js";
import { authMiddleware as auth} from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createJobListingValidator, updateJobListingValidator } from "../validators/jobListing.validator.js";
import { writeActionRateLimiter } from "../middleware/rateLimit.middleware.js";

const router = Router();


router.post("/", writeActionRateLimiter, auth, requireRole("employer"), validate(createJobListingValidator) , jobListingController.createJobListing);
router.get("/", auth, jobListingController.listJobListing);
router.get("/:id", auth, jobListingController.getJobListingById);
router.patch("/:id", writeActionRateLimiter, auth, requireRole("employer"), validate(updateJobListingValidator),jobListingController.updateJobListing);
router.delete("/:id", writeActionRateLimiter, auth, requireRole("employer"), jobListingController.deleteJobListing);

export default router;