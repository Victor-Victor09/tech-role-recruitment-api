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
