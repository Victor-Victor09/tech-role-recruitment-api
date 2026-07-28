/**
 * src/middleware/upload.middleware.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : middleware (multer plugs into the request pipeline, so it lives here — not in a generic helpers folder)
 *
 * Responsibility:
 *   multer configuration for the resume upload feature.
 *
 * Build this file to:
 *   - Configure multer storage (disk storage for local dev; swap for cloud storage later without touching callers)
 *   - Restrict file type (pdf/doc/docx) and a sane max size (e.g. 5MB)
 *   - Export a single-file middleware, e.g. uploadResume = multer({...}).single('resume'), used directly in applicant.routes.js's middleware chain
 *   - Export a small helper that turns the saved file into the resume_url string applicant.service.js expects
 *
 * Depends on / imports from:
 *   - multer
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 7 (Stub Your Utils, Helpers & File Uploads)
 */

// TODO: implement
