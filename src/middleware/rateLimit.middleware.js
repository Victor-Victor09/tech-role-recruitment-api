import rateLimit from "express-rate-limit";

// Stricter limit for auth endpoints — login/register are brute-force targets.
// 10 attempts per 15 minutes per IP is generous for a real user, painful for an attacker.
export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: {
        status: "error",
        message: "Too many attempts. Please try again later.",
    },
    standardHeaders: true, // return rate-limit info in RateLimit-* headers
    legacyHeaders: false,  // disable the older X-RateLimit-* headers
});
