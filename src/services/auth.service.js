/**Foundation & Auth
 * Layer : service (business logic — the CRUD "brain")
 *
 *   This is where validation results are used, DB calls happen (via the
 *   matching model file), and business rules live. Controllers call these
 *   functions and do nothing else.
 *
 * Build this file to:
 *   - register(payload) -> validate role, hash password (utils/hash.js), User.create({...}), then create the matching empty ApplicantProfile/EmployerProfile row, sign a JWT, return { user, token }
 *   - login(email, password) -> User.findOne({ where: { email } }), compare password, sign a JWT, return { user, token }
 *   - Rule: email must be unique — catch Sequelize's UniqueConstraintError and surface a clean 409/400 AppError, not a raw DB error
 *
 * Depends on / imports from:
 *   - src/models/user.model.js
 *   - src/utils/hash.js
 *   - src/utils/token.js
 *   - src/utils/AppError.js
 *
 **/
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/token.js";


export const register = async ({ email, password, role, phone}) => {

    const existingUser = await User.findOne({ where: { email }});
    if (existingUser) {
        throw new ApiError(409, "Email already in use");
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({ 
        email,
        passwordHash,
        role,
        phone,
    });

    const token = signToken({ id: user.id, role: user.role })

    //Never return passwordHash to the client side, even hashed.
    const {passwordHash: _omit, ...safeUser} = user.toJSON();
    
    return { user: safeUser, token };
};

// Logs in a user by checking their email and password, then returns a JWT token if successful.
export const login = async (email, password) => {
    const user = await User.findOne({ where: { email }});

    // Deliberately vague — don't reveal whether the email exists or the
    // password was wrong. Prevents attackers from probing which emails
    // are registered.
    if (!user) {
        throw new ApiError("Invalid email or password", 401);
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
        throw new ApiError("Invalid email or password", 401);
    }

    const token = signToken({ id: user.id, role: user.role });

    // Never return passwordHash to the client side, even hashed.
    const { passwordHash: _omit, ...safeUser } = user.toJSON();

    return { user: safeUser, token };
};
