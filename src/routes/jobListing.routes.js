/**
 * src/routes/jobListing.routes.js
 * ------------------------------------------------------------
 * Owner : Person C — Employer Track
 * Layer : route
 *
 * Responsibility:
 *   Wires job listing URLs. Create/edit/delete are employer-only; search/list is open to any authenticated user.
 *
 * Build this file to:
 *   - POST / -> auth, role('employer'), validate(jobListingValidator), jobListingController.create
 *   - GET / -> auth, jobListingController.list (search/filter via query params)
 *   - GET /:id -> auth, jobListingController.getById
 *   - PATCH /:id -> auth, role('employer'), jobListingController.update
 *   - DELETE /:id -> auth, role('employer'), jobListingController.remove (soft delete)
 *
 * Depends on / imports from:
 *   - src/controllers/jobListing.controller.js
 *   - src/middleware/auth.middleware.js
 *   - src/middleware/role.middleware.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 10 (Routes & Entry File)
 */

// TODO: implement
