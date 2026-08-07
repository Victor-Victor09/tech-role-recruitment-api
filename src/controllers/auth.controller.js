import * as authService from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";

export const register = catchAsync(async (req, res) => {
    const result = await authService.register(req.body);
    sendSuccess(res, result, "User registered successfully", 201);
});

export const login = catchAsync(async (req, res) => {
    const result = await authService.login(req.body);
    sendSuccess(res, result, "Login successfully", 200);
});
