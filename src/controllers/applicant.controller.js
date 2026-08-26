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
