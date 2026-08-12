import { body } from "express-validator";

export const createJobListingValidator = [
    body("title")
        .notEmpty().withMessage("Job title is required"),
    body("description")
        .notEmpty().withMessage("Job description is required"),
    body("workPreference")
        .notEmpty().withMessage("Work preference is required")
        .isIn(["remote", "hybrid", "onsite"]).withMessage("Work preference must be one of: remote, hybrid, onsite"),
]