/**
 * src/routes/applicant.routes.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : route
 *
 * Responsibility:
 *   Wires applicant profile URLs. All routes require auth + role('applicant').
 *
 * Build this file to:
 *   - POST /profile -> auth, role('applicant'), validate(applicantValidator), applicantController.createProfile
 *   - GET /profile -> auth, role('applicant'), applicantController.getProfile
 *   - PATCH /profile -> auth, role('applicant'), applicantController.updateProfile
 *   - POST /profile/resume -> auth, role('applicant'), uploadResume (upload.middleware.js), applicantController.uploadResume
 *
 * Depends on / imports from:
 *   - src/controllers/applicant.controller.js
 *   - src/middleware/auth.middleware.js
 *   - src/middleware/role.middleware.js
 *   - src/middleware/upload.middleware.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 10 (Routes & Entry File)
 */

// TODO: implement
