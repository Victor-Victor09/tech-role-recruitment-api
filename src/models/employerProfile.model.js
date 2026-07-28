/**
 * src/models/employerProfile.model.js
 * ------------------------------------------------------------
 * Owner : Person C — Employer Track
 * Layer : model (Sequelize — schema definition + associations)
 *
 * Responsibility:
 *   Defines this table as a Sequelize model: fields, constraints, and how
 *   it relates to other models. No business rules here — that belongs in
 *   the matching *.service.js file, which calls Model.create()/.findAll()/etc.
 *
 * Build this file to:
 *   - Define with: id (UUID, PK), userId (UUID, FK -> users.id, unique, allowNull: false), companyName (STRING, allowNull: false), companyDescription (TEXT), website (STRING)
 *   - Associations: EmployerProfile.belongsTo(User), EmployerProfile.hasMany(JobListing)
 *
 * Depends on / imports from:
 *   - src/config/db.js (the Sequelize instance)
 *   - sequelize
 *   - src/constants/*.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 5 (Database Schema)
 */

// TODO: implement
