/**
 * src/models/user.model.js
 * ------------------------------------------------------------
 * Owner : Person A — Foundation & Auth
 * Layer : model (Sequelize — schema definition + associations)
 *
 * Responsibility:
 *   Defines this table as a Sequelize model: fields, constraints, and how
 *   it relates to other models. No business rules here — that belongs in
 *   the matching *.service.js file, which calls Model.create()/.findAll()/etc.
 *
 * Build this file to:
 *   - Define with: id (UUID, defaultValue: DataTypes.UUIDV4, primaryKey), email (STRING, unique, allowNull: false), passwordHash (STRING, allowNull: false), role (ENUM via constants/roles.js, allowNull: false), phone (STRING, allowNull: true)
 *   - Enable timestamps: true (gives you createdAt/updatedAt for free)
 *   - Associations (in a separate associate(models) or at the bottom): User.hasOne(ApplicantProfile), User.hasOne(EmployerProfile)
 *
 * Depends on / imports from:
 *   - src/config/db.js (the Sequelize instance)
 *   - sequelize
 *   - src/constants/*.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 5 (Database Schema)
 */

// TODO: implement
