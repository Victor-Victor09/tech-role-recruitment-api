import EmployerProfile from "../models/employerProfile.model.js";
import ApiError from "../utils/ApiError.js";

const createProfile = async (userId, data) => {
    // Check if the user already has a profile
    const existingProfile = await EmployerProfile.findOne({ where: { userId } });
    if (existingProfile) {
        throw new ApiError("Employer's profile already exists", 400);
    }
    // Create the new profile
    const profile = await EmployerProfile.create({ ...data, userId });
    return profile;
}

const getProfile = async (userId, data) => {
    const profile = await EmployerProfile.findOne({ where: { userId } });
    if (!profile) {
        throw new ApiError("Employer's profile not found", 404);
    }
    return profile;
}

const updateProfile = async (userId, data) => {
    const profile = await EmployerProfile.findOne({ where: { userId } });
    if (!profile) {
        throw new ApiError("Employer's profile not found", 404);
    }
    // Update the profile with the new data
    await profile.update(data);
    return profile;
}

export default {
    createProfile,
    getProfile,
    updateProfile,
};