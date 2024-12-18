const userService = require("../services/userService");
const AppError = require("../utils/AppError");

const signUp = async (req, res, next) => {
  try {
    // Call the user service to create a new user
    const { user, token } = await userService.createUser(req.body, req.files);

    // Respond with success
    res.success(
      { user, token }, // data
      "Account created successfully", // message
      201 // statusCode
    );
  } catch (err) {
    // Handle Sequelize unique constraint errors
    if (err.name === "SequelizeUniqueConstraintError") {
      return next(
        new AppError("A user with this information already exists", 409, {
          details: err.errors.map((e) => e.message), // Additional error details
        })
      );
    }

    // Pass unexpected errors to the centralized error handler
    next(
      new AppError("An unexpected error occurred", 500, {
        details: err.message,
      })
    );
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    // Call the service to fetch all users
    const users = await userService.findAllUsers();

    // Respond with success
    res.success(
      { users }, // Data
      "All the users retrieved successfully", // Message
      200 // Status code
    );
  } catch (error) {
    // Use res.error for unexpected errors
    next(
      new AppError("Failed to retrieve users", 500, { details: error.message })
    );
  }
};



const login = async (req, res, next) => {
  try {
    // Call the service to authenticate user and generate token
    const token = await userService.loginUser(req.body);

    // Return success response
    res.success(
      { token }, // Data
      "Valid login credentials", // Message
      200 // Status code
    );
  } catch (error) {
    // Handle AppError explicitly or pass other errors to the global handler
    next(
      new AppError(error.message || "Login failed", error.statusCode || 500)
    );
  }
};

const requestToBecomeRenter = async (req, res, next) => {
  try {
    const userId = req.token.userId;

    // Call the service
    const newRequest = await userService.RequestToBecomeRenterService(userId);

    // Send success response
    res.success(
      newRequest, // Data
      `Request for user ${userId} has been sent`, // Message
      200 // Status Code
    );
  } catch (error) {
    // Handle errors using AppError and forward to the centralized error handler
    next(
      new AppError(error.message || "Request failed", error.statusCode || 500)
    );
  }
};

const acceptOwnerRequest = async (req, res, next) => {
  try {
    const role = req.token.role;
    const requestId = req.params.requestId;

    // Call the service to approve the request
    const result = await userService.acceptOwnerRequestService(requestId, role);

    // Respond with success
    res.success(
      result, // Data
      `Request for user ${result.userId} has been approved`, // Message
      200 // Status Code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message,
        error.statusCode || 500,
        error.details || null
      )
    );
  }
};

const getAllOwnersRequests = async (req, res, next) => {
  try {
    // Call the service to fetch all owner requests
    const requests = await userService.getAllOwnersRequestsService();

    // Send success response
    res.success(
      requests, // Data
      "All owners' requests retrieved successfully", // Message
      200 // Status Code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message,
        error.statusCode || 500,
        error.details || null
      )
    );
  }
};

const generateNewToken = async (req, res, next) => {
  try {
    const userId = req.token.userId;

    // Check if userId is provided
    if (!userId) {
      throw new AppError("Token is required", 401);
    }

    // Call the service to refresh the token
    const token = await userService.refreshToken(userId);

    // Send success response
    res.success(
      { token }, // Data
      "New token generated successfully", // Message
      200 // Status Code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || "Failed to generate token",
        error.statusCode || 500
      )
    );
  }
};

module.exports = {
  signUp,
  getAllUsers,
  login,
  requestToBecomeRenter,
  acceptOwnerRequest,
  getAllOwnersRequests,
  generateNewToken,
};
