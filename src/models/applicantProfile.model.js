/**
 * src/models/applicantProfile.model.js
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
 *   - Define with: id (UUID, PK), userId (UUID, FK -> users.id, unique, allowNull: false), fullName (STRING, allowNull: false), techStack (ARRAY(STRING) or JSON), yearsOfExperience (INTEGER, allowNull: false, validate: { min: 0 }), linkedinUrl (STRING), workPreference (ENUM via constants/jobTypes.js, allowNull: false), resumeUrl (STRING)
 *   - Associations: ApplicantProfile.belongsTo(User), ApplicantProfile.hasMany(Application)
 *
 * Depends on / imports from:
 *   - src/config/db.js (the Sequelize instance)
 *   - sequelize
 *   - src/constants/*.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 5 (Database Schema)
 */

// TODO: implement
