export const sendSuccess = (res, data, statusCode = 200) => {
    res.statusCode(statusCode).json({status: "success", data })
};

export const sendError = (res, data,statusCode = 500) => {
    res.statusCode(statusCode).json({status: "error", data})
};