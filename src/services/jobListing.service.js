import { Op } from "sequelize";
import JobListing from "../models/jobListing.model.js";
import EmployerProfile from "../models/employerProfile.model.js";
import ApiError from "../utils/ApiError.js";
import { LISTING_STATUS } from "../constants/jobTypes.js";


const getEmployerProfileOrThrow = async (userId) => {
    const employerProfile = await EmployerProfile.findOne({
        where: { userId }
    });
    if (!employerProfile) {
        throw new ApiError("Employer profile not found", 404);
    }
    return employerProfile;
};


// Creates a job listing on behalf of the logged-in employer.
// Takes userId (straight from req.user.id — the JWT payload)
const createJobListing = async (userId, data) => {
    const employerProfile = await getEmployerProfileOrThrow(userId);
    // Create the job listing with the employerId from the profile, amd not the user's id
    const listing = await JobListing.create({
        ...data,
        employerId: employerProfile.id
    });
    return listing;
};

/**
 * Updates a job listing — but only if it belongs to the requesting employer.
 *
 * Returns 404 (not 403) when the listing exists but belongs to someone
 * else: don't reveal whether a given listing ID exists to someone who isn't its owner.
 */
const updateJobListing = async (id, userId, data) => {
    // Check if the employer profile exists for the logged-in user
    const employerProfile = await getEmployerProfileOrThrow(userId);
    // Find the job listing by ID and employer ID
    const listing = await JobListing.findOne({
        where: { id, employerId: employerProfile.id }
    });
    if (!listing) {
        throw new ApiError("Job listing not found", 404);
    }
    // Update the job listing
    await listing.update(data);
    return listing;
};

// Soft deletes a job listing — but only if it belongs to the requesting employer.
const removeJobListing = async (id, userId) => {
    // Check if the employer profile exists for the logged-in user
    const employerProfile = await getEmployerProfileOrThrow(userId);
    // Find the job listing by ID and employer ID
    const listing = await JobListing.findOne({
        where: { id, employerId: employerProfile.id }
    });
    if (!listing) {
        throw new ApiError("Job listing not found or access denied", 404);
    }
    // Soft delete the job listing by setting status to 'closed'
    await listing.update({ status: LISTING_STATUS.CLOSED });
    return listing;
}

// Lists job listings based on provided filters.
// Filters can include tech stack, work preference, and location.
const listJobListing = async (filters = {}) => {
    const { techRole, workPreference, location, status } = filters;
    const where = {
        status: status || LISTING_STATUS.OPEN // Default to open listings if no status is provided
    };

    // iLike operator for case-insensitive partial matching in PostgreSQL.
    // "backend" also matches a techRole of "Backend Engineer".
    if (techRole) {
        where.techRole = { [Op.iLike]: `%${techRole}%` };
    }
    if (workPreference) {
        where.workPreference = workPreference;
    }
    if (location) {
        where.location = { [Op.iLike]: `%${location}%` };
    }

    const listings = await JobListing.findAll({ where });
    return listings;
};


const getJobListingById = async (id) => {
    const listing = await JobListing.findOne({ 
        where: { id, status: LISTING_STATUS.OPEN } 
    });
    if (!listing) {
        throw new ApiError("Job listing not found", 404);
    }
    return listing;
};

export default {
    createJobListing,
    updateJobListing,
    removeJobListing,
    listJobListing,
    getJobListingById
};