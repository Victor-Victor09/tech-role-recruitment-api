/**
 * src/services/auth.service.js
 * ------------------------------------------------------------
 * Owner : Person A — Foundation & Auth
 * Layer : service (business logic — the CRUD "brain")
 *
 * Responsibility:
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
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 8 (CRUD Services)
 */

// TODO: implement
