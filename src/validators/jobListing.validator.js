import { body } from "express-validator";
import { WORK_PREFERENCE } from "../constants/jobTypes.js";

const workPreferenceValues = Object.values(WORK_PREFERENCE);

export const createJobListingValidator = [
    body("title")
        .notEmpty().withMessage("Job title is required"),
    body("description")
        .notEmpty().withMessage("Job description is required"),
    body("techRole")
        .notEmpty().withMessage("Tech role is required"),
    body("workPreference")
        .notEmpty().withMessage("Work preference is required")
        .isIn(workPreferenceValues).withMessage("Work preference is not valid"),
]

export const updateJobListingValidator = [
    body("title")
        .optional().notEmpty().withMessage("Job title cannot be empty"),
    body("description")
        .optional().notEmpty().withMessage("Job description cannot be empty"),
    body("techRole")
        .optional().notEmpty().withMessage("Tech role cannot be empty"),
    body("workPreference")
        .optional().notEmpty().withMessage("Work preference cannot be empty")
        .isIn(workPreferenceValues).withMessage("Work preference is not valid"),
]