/**
 * src/services/application.service.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : service (business logic — the CRUD "brain")
 *
 * Responsibility:
 *   This is where validation results are used, DB calls happen (via the
 *   matching model file), and business rules live. Controllers call these
 *   functions and do nothing else.
 *
 * Build this file to:
 *   - apply(applicantId, data) -> reject if the listing is closed, reject duplicate open applications to the same listing
 *   - getById(id, requester) -> only the owning applicant or the listing's employer can view it
 *   - update(id, applicantId, data) -> e.g. update cover_note before it's reviewed
 *   - cancel(id, applicantId) -> soft delete (sets cancelled_at)
 *   - listForApplicant(applicantId)
 *   - listForEmployer(employerId) -> across all of that employer's listings
 *   - updateStatus(id, employerId, status) -> employer-only, status must be one of applied/under review/rejected/hired
 *
 * Depends on / imports from:
 *   - src/models/application.model.js
 *   - src/models/jobListing.model.js
 *   - src/utils/AppError.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 8 (CRUD Services)
 */

// TODO: implement
