import { body } from "express-validator";

// Shared between create and update, so we don't repeat rules — DRY.
const nameRules = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
];

const optionalNameRules = [
    body("firstName").optional().notEmpty().withMessage("First name cannot be empty if provided"),
    body("lastName").optional().notEmpty().withMessage("Last name cannot be empty if provided"),
];

// Fields that are always optional, on both create and update.
const optionalDetailRules = [
    body("techstack")
        .optional()
        .isArray().withMessage("techstack must be an array of strings"),
    body("linkedinURL")
        .optional()
        .isURL().withMessage("linkedinURL must be a valid URL"),
    body("githubURL")
        .optional()
        .isURL().withMessage("githubURL must be a valid URL"),
];

export const createProfileValidator = [
    ...nameRules,
    body("yearOfExperience")
        .notEmpty().withMessage("yearOfExperience is required")
        .isInt({ min: 0 }).withMessage("yearOfExperience must be a non-negative integer"),
    ...optionalDetailRules,
];

export const updateProfileValidator = [
    ...optionalNameRules,
    body("yearOfExperience")
        .optional()
        .isInt({ min: 0 }).withMessage("yearOfExperience must be a non-negative integer"),
    ...optionalDetailRules,
];
