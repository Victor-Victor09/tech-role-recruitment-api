/**
 * src/middleware/error.middleware.js
 * ------------------------------------------------------------
 * Owner : Person A — Foundation & Auth
 * Layer : middleware
 *
 * Responsibility:
 *   One global error handler. Build this FIRST, before any route exists — everything else relies on it.
 *
 * Build this file to:
 *   - Signature: (err, req, res, next)
 *   - If err is an AppError, use err.statusCode and err.message
 *   - Otherwise, default to 500 and a generic message (don't leak stack traces in production)
 *   - Always respond with the same JSON error shape via utils/response.js's sendError()
 *
 * Depends on / imports from:
 *   - src/utils/AppError.js
 *   - src/utils/response.js
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 9 (Controllers & Middleware)
 */

// TODO: implement
export function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Something went wrong.";

    console.error(err); // Log the error for debugging (optional)

    res.status(statusCode).json({
        status: "error",
        message,
    })
}