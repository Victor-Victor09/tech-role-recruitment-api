/**
 * src/middleware/auth.middleware.js
 * ------------------------------------------------------------
 * Owner : Person A — Foundation & Auth
 * Layer : middleware
 *
 * Responsibility:
 *   Verifies the JWT on the Authorization header and attaches req.user.
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
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 9 (Controllers & Middleware)
 */

// TODO: implement
