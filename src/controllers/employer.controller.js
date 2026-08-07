import catchAsync from "../utils/catchAsync.js";
import employerService from "../services/employer.service.js";
import { sendSuccess } from "../utils/response.js";

export const createProfile = catchAsync(async (req, res) => {
    const profile = await employerService.createProfile(req.user.id, req.body);
    sendSuccess(res, profile, "Employer profile created successfully", 201);
});

export const getProfile = catchAsync(async (req, res) => {
    const profile = await employerService.getProfile(req.user.id);
    sendSuccess(res, profile, "Employer profile retrieved successfully", 200);
});

export const updateProfile = catchAsync(async (req, res) => {                                           
    const profile = await employerService.updateProfile(req.user.id, req.body);
    sendSuccess(res, profile, "Employer profile updated successfully", 200);
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
