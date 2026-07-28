/**
 * src/models/application.model.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : model (Sequelize — schema definition + associations)
 *
 * Responsibility:
 *   Defines this table as a Sequelize model: fields, constraints, and how
 *   it relates to other models. No business rules here — that belongs in
 *   the matching *.service.js file, which calls Model.create()/.findAll()/etc.
 *
 * Build this file to:
 *   - Define with: id (UUID, PK), applicantId (UUID, FK -> applicant_profiles.id, allowNull: false), jobListingId (UUID, FK -> job_listings.id, allowNull: false), status (ENUM via constants/applicationStatus.js, defaultValue: 'applied'), coverNote (TEXT), cancelledAt (DATE, allowNull: true)
 *   - Timestamps: true — updatedAt is your audit trail (bumps automatically whenever status changes)
 *   - Associations: Application.belongsTo(ApplicantProfile), Application.belongsTo(JobListing)
 *
 * Depends on / imports from:
 *   - src/config/db.js (the Sequelize instance)
 *   - sequelize
 *   - src/constants/*.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 5 (Database Schema)
 */

// TODO: implement
