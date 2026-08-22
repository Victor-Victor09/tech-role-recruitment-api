/**
 * src/controllers/application.controller.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : controller (request in, response out — thin)
 *
 * Responsibility:
 *   Pull what's needed off req, call the matching service function, pass
 *   the result to sendSuccess(). No SQL, no business rules here.
 *
 * Build this file to:
 *   - applyToJob
 *   - getById
 *   - update
 *   - cancel
 *   - listForApplicant
 *   - listForEmployer
 *   - updateStatus — each: pull what's needed off req, call the service, sendSuccess
 *
 * Depends on / imports from:
 *   - src/services/application.service.js
 *   - src/utils/catchAsync.js
 *   - src/utils/response.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 9 (Controllers & Middleware)
 */
// TODO: implement 
import catchAsync from "../utils/catchAsync.js";
import applicationService from "../services/application.service.js";
import { sendSuccess } from "../utils/response.js";

export const applyToJob = catchAsync(async (req, res) => {
  const application = await applicationService.apply(req.user.id, req.body);
  sendSuccess(res, application, "Application submitted successfully", 201);
});

export const getById = catchAsync(async (req, res) => {
  const application = await applicationService.getById(req.params.id, req.user.id, req.user.role);
  sendSuccess(res, application, "Application retrieved successfully", 200);
});

export const update = catchAsync(async (req, res) => {
  const application = await applicationService.update(req.params.id, req.user.id, req.body);
  sendSuccess(res, application, "Application updated successfully", 200);
});

export const cancel = catchAsync(async (req, res) => {
  const application = await applicationService.cancel(req.params.id, req.user.id);
  sendSuccess(res, application, "Application cancelled successfully", 200);
});

export const listForApplicant = catchAsync(async (req, res) => {
  const applications = await applicationService.listForApplicant(req.user.id);
  sendSuccess(res, applications, "Applications retrieved successfully", 200);
});

export const listForEmployer = catchAsync(async (req, res) => {
  const applications = await applicationService.listForEmployer(req.user.id);
  sendSuccess(res, applications, "Applications retrieved successfully", 200);
});

export const updateStatus = catchAsync(async (req, res) => {
  const application = await applicationService.updateStatus(req.params.id, req.user.id, req.body.status);
  sendSuccess(res, application, "Application status updated successfully", 200);
});
