import { Router } from "express";
import authRoutes from "./auth.routes.js";
import employerRoutes from "./employer.routes.js";
import jobListingRoutes from "./jobListing.routes.js";
import applicantRoutes from "./applicant.routes.js";
import applicationRoutes from "./application.routes.js";

const router = Router();

// Uncomment each line aftfer their respective route files have been built.
router.use("/auth", authRoutes);
router.use("/applicants", applicantRoutes);
router.use("/employers", employerRoutes);
router.use("/jobs", jobListingRoutes);
router.use("/applications", applicationRoutes);

export default router;