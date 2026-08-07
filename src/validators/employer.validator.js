import { body } from "express-validator";

export const createProfileValidator = [
    body("companyName")
        .notEmpty().withMessage("Company name is required"),
    body("companyWebsite")
        .optional()
        .isURL().withMessage("Website must be a valid URL"),
];

export const updateProfileValidator = [
    body("companyName")
        .optional()
        .notEmpty().withMessage("Company name cannot be empty if provided"),
    body("companyWebsite")
        .optional()
        .isURL().withMessage("Website must be a valid URL if provided"),
];