import Application from "../models/application.model.js";
import ApplicantProfile from "../models/applicantProfile.model.js";
import JobListing from "../models/jobListing.model.js";
import EmployerProfile from "../models/employerProfile.model.js";
import ApiError from "../utils/ApiError.js";
import { APPLIED, HIRED, REJECTED } from "../constants/applicationStatus.js";
import { LISTING_STATUS } from "../constants/jobTypes.js";
import { APPLICANT, EMPLOYER } from "../constants/roles.js";

// Small private helper — every function here needs "the caller's
// applicant profile," so resolve it once instead of repeating the
// lookup-and-404 pattern in every export. Not exported: callers outside
// this file only ever deal in userId, never in applicantProfile.id.
const resolveApplicantProfile = async (userId) => {
    const profile = await ApplicantProfile.findOne({ where: { userId } });
    if (!profile) {
        throw new ApiError("Create your applicant profile before applying to jobs", 400);
    }
    return profile;
};

const resolveEmployerProfile = async (userId) => {
    const profile = await EmployerProfile.findOne({ where: { userId } });
    if (!profile) {
        throw new ApiError("Employer profile not found", 404);
    }
    return profile;
};

const apply = async (userId, { jobListingId, coverNote }) => {
    const applicantProfile = await resolveApplicantProfile(userId);

    const listing = await JobListing.findByPk(jobListingId);
    if (!listing) {
        throw new ApiError("Job listing not found", 404);
    }
    if (listing.status !== LISTING_STATUS.OPEN) {
        throw new ApiError("This job listing is no longer accepting applications", 400);
    }

    // Reject duplicate applications — but only against a still-active one.
    // If the applicant previously cancelled, they should be free to apply
    // again, so we exclude cancelled rows from the duplicate check.
    const existing = await Application.findOne({
        where: {
            applicantId: applicantProfile.id,
            jobListingId,
            cancelledAt: null,
        },
    });
    if (existing) {
        throw new ApiError("You have already applied to this job listing", 409);
    }

    const application = await Application.create({
        applicantId: applicantProfile.id,
        jobListingId,
        coverNote,
    });
    return application;
};

const getById = async (id, userId, role) => {
    const application = await Application.findByPk(id, {
        include: [ApplicantProfile, JobListing],
    });
    if (!application) {
        throw new ApiError("Application not found", 404);
    }

    if (role === APPLICANT) {
        const applicantProfile = await resolveApplicantProfile(userId);
        if (application.applicantId !== applicantProfile.id) {
            throw new ApiError("You do not have permission to view this application", 403);
        }
    } else if (role === EMPLOYER) {
        const employerProfile = await resolveEmployerProfile(userId);
        if (application.JobListing.employerId !== employerProfile.id) {
            throw new ApiError("You do not have permission to view this application", 403);
        }
    } else {
        throw new ApiError("You do not have permission to view this application", 403);
    }

    return application;
};

const update = async (id, userId, data) => {
    const applicantProfile = await resolveApplicantProfile(userId);
    const application = await Application.findByPk(id);
    if (!application) {
        throw new ApiError("Application not found", 404);
    }
    if (application.applicantId !== applicantProfile.id) {
        throw new ApiError("You do not have permission to edit this application", 403);
    }
    if (application.status !== APPLIED) {
        throw new ApiError("This application has already been reviewed and can no longer be edited", 400);
    }

    await application.update(data); // data is pre-shaped by updateApplicationValidator (coverNote only)
    return application;
};

const cancel = async (id, userId) => {
    const applicantProfile = await resolveApplicantProfile(userId);
    const application = await Application.findByPk(id);
    if (!application) {
        throw new ApiError("Application not found", 404);
    }
    if (application.applicantId !== applicantProfile.id) {
        throw new ApiError("You do not have permission to cancel this application", 403);
    }
    if (application.cancelledAt) {
        throw new ApiError("This application has already been cancelled", 400);
    }
    if ([HIRED, REJECTED].includes(application.status)) {
        throw new ApiError(`Cannot cancel an application that is already ${application.status}`, 400);
    }

    await application.update({ cancelledAt: new Date() });
    return application;
};

const listForApplicant = async (userId) => {
    const applicantProfile = await resolveApplicantProfile(userId);
    return Application.findAll({
        where: { applicantId: applicantProfile.id },
        include: [JobListing],
        order: [["appliedAt", "DESC"]],
    });
};

const listForEmployer = async (userId) => {
    const employerProfile = await resolveEmployerProfile(userId);
    return Application.findAll({
        include: [
            { model: JobListing, where: { employerId: employerProfile.id } },
            ApplicantProfile,
        ],
        order: [["appliedAt", "DESC"]],
    });
};

const updateStatus = async (id, userId, status) => {
    const employerProfile = await resolveEmployerProfile(userId);
    const application = await Application.findByPk(id, { include: [JobListing] });
    if (!application) {
        throw new ApiError("Application not found", 404);
    }
    if (application.JobListing.employerId !== employerProfile.id) {
        throw new ApiError("You do not have permission to update this application", 403);
    }

    await application.update({ status });
    return application;
};

export default {
    apply,
    getById,
    update,
    cancel,
    listForApplicant,
    listForEmployer,
    updateStatus,
};
