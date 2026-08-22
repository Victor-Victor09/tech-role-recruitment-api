/**
 * src/controllers/applicant.controller.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : controller (request in, response out — thin)
 *
 * Responsibility:
 *   Pull what's needed off req, call the matching service function, pass
 *   the result to sendSuccess(). No SQL, no business rules here.
 *
 * Build this file to:
 *   - createProfile
 *   - getProfile
 *   - updateProfile — each: pull req.user.id / req.body, call the service, sendSuccess
 *   - uploadResume — req.file is populated by upload.middleware.js; call applicantService.updateProfile with the resulting resume_url, sendSuccess
 *
 * Depends on / imports from:
 *   - src/services/applicant.service.js
 *   - src/utils/catchAsync.js
 *   - src/utils/response.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 9 (Controllers & Middleware)
 */

// TODO: implement

import catchAsync from "../utils/catchAsync.js";
import applicantService from "../services/applicant.service.js";
import { sendSuccess } from "../utils/response.js";
import { resumeFileToUrl } from "../middleware/upload.middleware.js";
import ApiError from "../utils/ApiError.js";

export const createProfile = catchAsync(async (req, res) => {
    const profile = await applicantService.createProfile(req.user.id, req.body);
    sendSuccess(res, profile, "Applicant profile created successfully", 201);
});

export const getProfile = catchAsync(async (req, res) => {
    const profile = await applicantService.getProfile(req.user.id);
    sendSuccess(res, profile, "Applicant profile retrieved successfully", 200);
});

export const updateProfile = catchAsync(async (req, res) => {
    const profile = await applicantService.updateProfile(req.user.id, req.body);
    sendSuccess(res, profile, "Applicant profile updated successfully", 200);
});

export const uploadResume = catchAsync(async (req, res) => {
    // uploadResume (the multer middleware) already ran and populated
    // req.file before this handler executes — see applicant.routes.js.
    if (!req.file) {
        throw new ApiError("No resume file was provided", 400);
    }
    const resumeUrl = resumeFileToUrl(req.file);
    const profile = await applicantService.attachResume(req.user.id, resumeUrl);
    sendSuccess(res, profile, "Resume uploaded successfully", 200);
});
