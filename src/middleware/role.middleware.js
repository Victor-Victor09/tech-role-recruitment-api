import ApiError from "../utils/ApiError.js";

export const requireRole = (role) => (req, res, next) => {

    if (!req.user || req.user.role !== role){
        return next( new ApiError("You do not have permission to perform this action", 403));
    }
    next();
};
