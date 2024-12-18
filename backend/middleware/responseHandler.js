const {errorResponse, successResponse} = require("../utils/responseUtils")

const responseHandler = (req, res, next) => {
    res.success = (data, message , statusCode = 200) => {
        res.status(statusCode).json(successResponse(data,message));
    };

    res.error = (error, message = "An error occurred", statusCode = 500) => {
        res.status(statusCode).json(errorResponse(error,message));
    };

    next();
};

module.exports = responseHandler;
