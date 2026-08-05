/**
 *   This file runs a resource's validator rules before the controller ever sees the request.
 *
 * Build this file to:
 *   - Export a factory: validate(validatorRules)
 *   - Run the rules against req.body / req.params / req.query
 *   - If there are errors, throw/return new AppError(message, 400) with the collected messages
 *   - Otherwise call next()
 *
 * Depends on / imports from:
 *   - src/utils/AppError.js
 *   - src/validators/*.validator.js
 */

// TODO: implement
import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

export const validate = (validations) => async (req, res, next) => {
    await Promise.all(validations.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()){
        return next();
    }
    const message = errors.array().map((e) => e.msg).join(", ");
    next(new ApiError(message, 400));
};