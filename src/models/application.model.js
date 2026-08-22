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
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ApplicantProfile from "./applicantProfile.model.js";
import JobListing from "./jobListing.model.js";
import { APPLIED, UNDER_REVIEW, REJECTED, HIRED } from "../constants/applicationStatus.js";

const Application = sequelize.define(
    "Application",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        applicantId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: ApplicantProfile,
                key: "id",
            },
        },
        jobListingId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: JobListing,
                key: "id",
            },
        },
        status: {
            type: DataTypes.ENUM(APPLIED, UNDER_REVIEW, REJECTED, HIRED),
            allowNull: false,
            defaultValue: APPLIED,
        },
        coverNote: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // Soft-delete marker for "cancel" — we set this instead of destroying
        // the row, so the audit trail (who applied, when, what happened)
        // survives a cancellation.
        cancelledAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "applications",
        timestamps: true,
        // IMPORTANT: the migration names the "created" column `appliedAt`,
        // not the Sequelize default `createdAt`. Without this mapping,
        // Sequelize would try to read/write a `createdAt` column that
        // doesn't exist in the DB and every query would blow up.
        createdAt: "appliedAt",
        updatedAt: "updatedAt",
    }
);

// Associations — declared on the "many" side (Application) so the two
// parent models (ApplicantProfile, JobListing) don't need to import
// Application back and create a circular import between files.
Application.belongsTo(ApplicantProfile, { foreignKey: "applicantId" });
ApplicantProfile.hasMany(Application, { foreignKey: "applicantId" });

Application.belongsTo(JobListing, { foreignKey: "jobListingId" });
JobListing.hasMany(Application, { foreignKey: "jobListingId" });

export default Application;
