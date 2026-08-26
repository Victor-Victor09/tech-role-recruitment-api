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