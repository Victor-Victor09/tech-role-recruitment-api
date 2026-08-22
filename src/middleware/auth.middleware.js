/*
 * This file verifies the JWT on the Authorization header and attaches req.user.
 *
 * Build this file to:
 *   - Read the Bearer token from the Authorization header
 *   - Throw new AppError('Unauthorized', 401) if it's missing or invalid
 *   - Verify it with utils/token.js's verifyToken()
 *   - Attach the decoded payload as req.user, then call next()
 *
 * Depends on / imports from:
 *   - src/utils/token.js
 *   - src/utils/AppError.js
 *   - src/utils/catchAsync.js
 */

// TODO: implement
import { verifyToken } from "../utils/token.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

export const authMiddleware = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = verifyToken(token);
        req.user = decoded; // expect { id, role } in the token payload.
        next();
    } catch (err){
        if (err.name === "TokenExpiredError") {
            throw new ApiError("Session expired, please log in again", 401);
        }
        throw new ApiError("Invalid expired token", 401);
    }
})