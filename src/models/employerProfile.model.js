import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const EmployerProfile = sequelize.define("EmployerProfile",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: User,
                key: "id",
            },
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        companyWebsite: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "employerProfiles",
        timestamps: true,
    }
);

// Associations — lets Sequelize do EmployerProfile.include(User) style joins later,
// e.g. fetching an employer's profile alongside their login/auth info.
EmployerProfile.belongsTo(User, { foreignKey: "userId" });
User.hasOne(EmployerProfile, { foreignKey: "userId" });
// EmployerProfile.hasMany(JobListing, { foreignKey: "employerId" });

export default EmployerProfile
