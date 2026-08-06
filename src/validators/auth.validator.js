import { body } from "express-validator";

export const registerValidator = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("role")
        .notEmpty().withMessage("Role is required")
        .isIn(["applicant", "employer"]).withMessage("Role must be either 'applicant' or 'employer'"),
    body("phone").optional().isMobilePhone().withMessage("Invalid phone number format"),
];

export const loginValidator = [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
];