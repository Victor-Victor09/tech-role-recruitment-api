import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const ApplicantProfile = sequelize.define(
    "ApplicantProfile",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true, // one profile per user — enforced in DB too
            references: {
                model: User,
                key: "id",
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Lowercase column name is intentional (matches the migration,
        // documented as known drift) — don't "fix" the casing here without
        // also writing a migration to rename the column.
        techstack: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        yearOfExperience: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 0 },
        },
        linkedinURL: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { isUrl: true },
        },
        githubURL: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { isUrl: true },
        },
        // Stores a path/URL to the uploaded file, not the file itself.
        // Populated by applicant.service.js after upload.middleware.js
        // saves the actual file to disk.
        resume: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "applicantProfiles",
        timestamps: true,
    }
);

// Associations — ApplicantProfile <-> User (one-to-one)
ApplicantProfile.belongsTo(User, { foreignKey: "userId" });
User.hasOne(ApplicantProfile, { foreignKey: "userId" });

export default ApplicantProfile;
