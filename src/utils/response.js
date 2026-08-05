export const sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json({status: "success", message})
};

export const sendError = (res, data, statusCode = 500) => {
    res.status(statusCode).json({status: "error", message})
};