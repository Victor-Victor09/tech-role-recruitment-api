import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/token.js";


export const register = async ({ email, password, role, phone}) => {

    const existingUser = await User.findOne({ where: { email }});
    if (existingUser) {
        throw new ApiError("Email already in use", 409);
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
export const login = async ({email, password}) => {
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
