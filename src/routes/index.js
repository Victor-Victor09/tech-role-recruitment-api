/**
 *   This fileMounts every resource router under /api. This is the one file app.js imports.
 *
 * Build this file to:
 *   - router.use('/auth', authRoutes)
 *   - router.use('/applicants', applicantRoutes)
 *   - router.use('/employers', employerRoutes)
 *   - router.use('/jobs', jobListingRoutes)
 *   - router.use('/applications', applicationRoutes)
 *   - module.exports = router
 *
 * Depends on / imports from:
 *   - all files in src/routes/
 *
 */
import { Router } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

// Uncomment each line aftfer their respective route files have been built.
router.use("/auth", authRoutes);
// router.use("/applicants", applicantRoutes);
// router.use("/employers", employerRoutes);
// router.use("/jobs", jobListingRoutes);
// router.use("/applications", applicationRoutes);

export default router;