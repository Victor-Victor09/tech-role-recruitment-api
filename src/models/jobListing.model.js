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