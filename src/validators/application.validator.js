/**
 * src/validators/application.validator.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : validator
 *
 * Responsibility:
 *   Field presence, type, and format rules for this resource. Runs inside validate.middleware.js, before the controller sees the request.
 *
 * Build this file to:
 *   - jobListingId (required, valid UUID)
 *   - coverNote (optional)
 *   - status, on the employer status-update route, in ['applied','under review','rejected','hired']
 *
 * Depends on / imports from:
 *   - express-validator, or a small hand-rolled check function
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 7 (Stub Your Utils, Helpers & File Uploads)
 */

// TODO: implement

import { body } from "express-validator";
import { APPLIED, UNDER_REVIEW, REJECTED, HIRED } from "../constants/applicationStatus.js";

const VALID_STATUSES = [APPLIED, UNDER_REVIEW, REJECTED, HIRED];

// POST /applications — applicant applying to a job listing
export const applyValidator = [
    body("jobListingId")
        .notEmpty().withMessage("jobListingId is required")
        .isUUID().withMessage("jobListingId must be a valid UUID"),
    body("coverNote")
        .optional()
        .isString().withMessage("coverNote must be text")
        .isLength({ max: 2000 }).withMessage("coverNote is too long (max 2000 characters)"),
];

// PATCH /applications/:id — applicant editing their own cover note
// before it's reviewed
export const updateApplicationValidator = [
    body("coverNote")
        .optional()
        .isString().withMessage("coverNote must be text")
        .isLength({ max: 2000 }).withMessage("coverNote is too long (max 2000 characters)"),
];

// PATCH /applications/:id/status — employer moving an application
// through the pipeline
export const updateStatusValidator = [
    body("status")
        .notEmpty().withMessage("status is required")
        .isIn(VALID_STATUSES).withMessage(`status must be one of: ${VALID_STATUSES.join(", ")}`),
];
