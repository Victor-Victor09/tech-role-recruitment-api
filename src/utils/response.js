export const sendSuccess = (res, data, message, statusCode = 200) => {
    res.status(statusCode).json({status: "success", message, data})
};

export const sendError = (res, message, statusCode = 500) => {
    res.status(statusCode).json({status: "error", message})
};