export default function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Something went wrong";

    console.error(err); // Log the error for debugging (optional)

    res.status(statusCode).json({
        status: "error",
        message,
    })
}