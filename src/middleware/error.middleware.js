/**
 *   One global error handler. Build this file FIRST, before any route exists — everything else relies on it.
 *
 * Build this file to:
 *   - Signature: (err, req, res, next)
 *   - If err is an AppError, use err.statusCode and err.message
 *   - Otherwise, default to 500 and a generic message (don't leak stack traces in production)
 *   - Always respond with the same JSON error shape via utils/response.js's sendError()
 *
 * Depends on / imports from:
 *   - src/utils/ApiError.js
 *   - src/utils/response.js
 */
export default function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Something went wrong";

    console.error(err); // Log the error for debugging

    res.status(statusCode).json({
        status: "error",
        message,
    });
}