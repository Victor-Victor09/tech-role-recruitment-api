export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
    }
}

/** This is a utility function to create an AppError
*** instance with a specific message and status code.
*** It is a standard way to throw an error with an
*** HTTP status code attached.*/