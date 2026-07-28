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
