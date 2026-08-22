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
