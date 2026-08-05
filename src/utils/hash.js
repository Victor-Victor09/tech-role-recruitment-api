import bcrypt from "bcrypt";

//thin wrappers around bcrypt so nobody re-implements
//  password hashing slightly differently in two places

// Number of rounds to use when hashing a password.
// 10 is the default for bcrypt.
const SALT_ROUNDS = 10;
export const hashPassword = (plain) => bcrypt.hash(plain, SALT_ROUNDS);
export const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);