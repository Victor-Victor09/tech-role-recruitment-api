export const sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json({status: "success", data})
};

export const sendError = (res, message, statusCode = 500) => {
    res.status(statusCode).json({status: "error", message})
};