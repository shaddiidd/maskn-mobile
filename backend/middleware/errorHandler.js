const AppError = require("../utils/AppError")

const errorHandler = (err, req, res, next) => {
    // Check if the error is an instance of AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            details: err.details || null, // Include additional details if available
        });
    }

    // Handle unexpected errors
    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.message : null,
    });
};

module.exports = errorHandler;

