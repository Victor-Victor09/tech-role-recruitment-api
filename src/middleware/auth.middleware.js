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