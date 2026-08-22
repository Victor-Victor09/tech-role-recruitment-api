import catchAsync from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import jobListingService from "../services/jobListing.service.js";


// POST / — employer creates a listing. userId comes off the JWT (req.user.id),
// never trusted from the request body.
export const createJobListing = catchAsync(async (req, res) => {
    const listing = await jobListingService.createJobListing(req.user.id, req.body);
    sendSuccess(res, listing, "Job listing created successfully", 201);
});

// PATCH /:id — employer updates their own listing. Ownership is enforced
// inside the service, not here — the controller just passes both ids through.
export const updateJobListing = catchAsync(async (req, res) => {
    const listing = await jobListingService.updateJobListing(req.params.id, req.user.id, req.body);
    sendSuccess(res, listing, "Job listing updated successfully", 200);
});

// DELETE /:id — soft delete (status -> 'closed'), enforced inside the service.
export const deleteJobListing = catchAsync(async (req, res) => {
    const listing = await jobListingService.removeJobListing(req.params.id, req.user.id);
    sendSuccess(res, null, "Job listing closed successfully", 200);
});

// GET / — public search/filter. Query string params map straight onto the
// filters object the service expects (?techRole=backend&location=lagos).
export const listJobListing = catchAsync(async (req, res) => {
    const listings = await jobListingService.listJobListing(req.query);
    sendSuccess(res, listings, "Job listings retrieved successfully", 200);
});

// GET /:id — public single-listing view.
export const getJobListingById = catchAsync(async (req, res) => {
    const listing = await jobListingService.getJobListingById(req.params.id);
    sendSuccess(res, listing, "Job listing retrieved successfully", 200);
});