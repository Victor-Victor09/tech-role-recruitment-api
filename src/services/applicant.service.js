import ApplicantProfile from "../models/applicantProfile.model.js";
import ApiError from "../utils/ApiError.js";

const createProfile = async (userId, data) => {
    // Rule: a user can only have one applicant profile.
    const existingProfile = await ApplicantProfile.findOne({ where: { userId } });
    if (existingProfile) {
        throw new ApiError("Applicant profile already exists", 400);
    }

    const profile = await ApplicantProfile.create({ ...data, userId });
    return profile;
};

const getProfile = async (userId) => {
    const profile = await ApplicantProfile.findOne({ where: { userId } });
    if (!profile) {
        throw new ApiError("Applicant profile not found", 404);
    }
    return profile;
};

const updateProfile = async (userId, data) => {
    const profile = await ApplicantProfile.findOne({ where: { userId } });
    if (!profile) {
        throw new ApiError("Applicant profile not found", 404);
    }
    await profile.update(data);
    return profile;
};

// Called by applicantController.uploadResume once multer has already
// saved the file to disk and upload.middleware.js has turned it into
// a resume_url string. This function just persists that string —
// keeps the "what does a resume path look like" logic out of the service.
const attachResume = async (userId, resumeUrl) => {
    const profile = await ApplicantProfile.findOne({ where: { userId } });
    if (!profile) {
        throw new ApiError("Applicant profile not found — create your profile before uploading a resume", 404);
    }
    await profile.update({ resume: resumeUrl });
    return profile;
};

export default {
    createProfile,
    getProfile,
    updateProfile,
    attachResume,
};
