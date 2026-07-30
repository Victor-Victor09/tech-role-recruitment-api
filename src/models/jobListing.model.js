import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// define() tells Sequelize to map this JavaScript layout directly to a PostgreSQL table named 'Jobs'
const jobListing = sequelize.define('JobListing', {






/**
 * src/models/jobListing.model.js
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
 *   - Define with: id (UUID, PK), employerId (UUID, FK -> employer_profiles.id, allowNull: false), title (STRING, allowNull: false), description (TEXT, allowNull: false), techStack (ARRAY(STRING) or JSON), workPreference (ENUM via constants/jobTypes.js, allowNull: false), location (STRING), status (ENUM via constants/jobTypes.js, defaultValue: 'open')
 *   - Associations: JobListing.belongsTo(EmployerProfile), JobListing.hasMany(Application)
 *
 * Depends on / imports from:
 *   - src/config/db.js (the Sequelize instance)
 *   - sequelize
 *   - src/constants/*.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 5 (Database Schema)
 */

// TODO: implement
