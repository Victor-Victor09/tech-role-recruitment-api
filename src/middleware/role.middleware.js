/**
 *   This file restricts a route to one or more roles. Must run AFTER auth.middleware.js.
 *
 * Build this file to:
 *   - Export a factory: requireRole(...allowedRoles)
 *   - Returned middleware checks req.user.role against allowedRoles
 *   - Throw new AppError('Forbidden', 403) if it doesn't match
 *
 * Depends on / imports from:
 *   - src/utils/AppError.js
 */

// TODO: implement
import ApiError from "../utils/ApiError.js";

export const requireRole = (role) => (req, res, next) => {

    if (!req.user || req.user.role !== role){
        return next( new ApiError("You do not have permission to perform this action", 403));
    }
    next();
};
