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