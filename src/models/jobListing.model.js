/**
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
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import EmployerProfile from "./employerProfile.model.js";
import {WORK_PREFERENCE, LISTING_STATUS} from "../constants/jobTypes.js";

const JobListing = sequelize.define(
    "JobListing",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        employerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: EmployerProfile,
                key: "id",
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        techRole: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        workPreference: {
            type: DataTypes.ENUM(...Object.values(WORK_PREFERENCE)),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(LISTING_STATUS)),
            defaultValue: LISTING_STATUS.OPEN,
            allowNull: false,
        },
    },
    {
        tableName: "jobListings",
        timestamps: true,
    }
);
// Associations — lets us do JobListing.include(EmployerProfile) later
// (e.g. showing company name alongside a listing in search results).
JobListing.belongsTo(EmployerProfile, { foreignKey: "employerId", as: "employerProfile" });
EmployerProfile.hasMany(JobListing, { foreignKey: "employerId", as: "jobListings" });

export default JobListing;