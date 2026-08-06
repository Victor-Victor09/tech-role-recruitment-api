/**
 *   Pull what's needed off req, call the matching service function, pass
 *   the result to sendSuccess(). No SQL, no business rules here.
 *
 * Build this file to:
 *   - register — catchAsync wrapper, calls authService.register, sendSuccess(res, data, 201)
 *   - login — catchAsync wrapper, calls authService.login, sendSuccess(res, data, 200)
 *
 * Depends on / imports from:
 *   - src/services/auth.service.js
 *   - src/utils/catchAsync.js
 *   - src/utils/response.js
 *
 */
import * as authService from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";

export const register = catchAsync(async (req, res) => {
    const result = await authService.register(req.body);
    sendSuccess(res, result, 201);
});

export const login = catchAsync(async (req, res) => {
    const result = await authService.login(req.body);
    sendSuccess(res, result, 200);
});
