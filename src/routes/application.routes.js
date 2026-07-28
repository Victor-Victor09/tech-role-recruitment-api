/**
 * src/routes/application.routes.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : route
 *
 * Responsibility:
 *   Wires application URLs. Applying/viewing/cancelling is applicant-only; status updates and the employer list are employer-only.
 *
 * Build this file to:
 *   - POST / -> auth, role('applicant'), validate(applicationValidator), applicationController.applyToJob
 *   - GET /:id -> auth, applicationController.getById
 *   - PATCH /:id -> auth, role('applicant'), applicationController.update
 *   - DELETE /:id -> auth, role('applicant'), applicationController.cancel
 *   - GET /applicant/me -> auth, role('applicant'), applicationController.listForApplicant
 *   - GET /employer/me -> auth, role('employer'), applicationController.listForEmployer
 *   - PATCH /:id/status -> auth, role('employer'), applicationController.updateStatus
 *
 * Depends on / imports from:
 *   - src/controllers/application.controller.js
 *   - src/middleware/auth.middleware.js
 *   - src/middleware/role.middleware.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 10 (Routes & Entry File)
 */

// TODO: implement
