import jwt from "jsonwebtoken";
import config from "../config/env.js";


// This utility function is used to sign and verify
// JWT tokens for authentication purposes.
export const signToken = (payload) =>
    jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

export const verifyToken = (token) => 
    jwt.verify(token, config.jwtSecret);