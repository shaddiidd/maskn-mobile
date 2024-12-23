const propertyService = require("../services/propertyService");
const userService = require("../services/userService");
const AppError = require("../utils/AppError");

const addProperty = async (req, res, next) => {
  try {
    const ownerId = req.token.userId; // Fetch userId from token
    const role = req.token.role;

    // Call the service to create the property
    const newProperty = await propertyService.createProperty(
      req.body,
      ownerId,
      role,
      req.files
    );

    // Respond with success
    res.success(
      newProperty, // Data
      "Property added successfully", // Message
      201 // Status Code
    );
  } catch (error) {
    // Handle errors using AppError and pass to centralized error handler
    next(
      new AppError(
        error.message,
        error.statusCode || 500,
        error.details || null
      )
    );
  }
};

const getAllProperties = async (req, res, next) => {
  try {
    const userRole = req.token?.role || null; // Optional role from the token

    // Call the service to fetch properties
    const properties = await propertyService.getAllProperties(userRole);

    // Send success response
    res.success(
      properties, // Data
      "All properties retrieved successfully", // Message
      200 // Status code
    );
  } catch (error) {
    // Handle errors using AppError and forward to error handler
    next(
      new AppError(
        error.message,
        error.statusCode || 500,
        error.details || null
      )
    );
  }
};

const getMyProperties = async (req, res, next) => {
  try {
    const userId = req.token.userId; // Extract user ID from token

    // Call the service to find properties
    const properties = await propertyService.findPropertiesByUserId(
      userId,
      userId
    );

    // Send success response
    res.success(
      properties, // Data
      `All properties for user ${userId}`, // Message
      200 // Status Code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || "Failed to retrieve properties",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const getPropertiesByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Target user's ID
    const tokenUserId = req.token?.userId || null; // Authenticated user's ID

    // Call the service to fetch properties
    const properties = await propertyService.findPropertiesByUserId(
      userId,
      tokenUserId
    );

    // Send success response
    res.success(
      properties, // Data
      `All properties for user ${userId} retrieved successfully`, // Message
      200 // Status code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || "Failed to retrieve properties",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const updateProperty = async (req, res, next) => {
  const userId = req.token.userId; // Extract user ID from token
  const role = req.token.role; // Extract user role from token
  const propertyId = req.params.id; // Extract property ID from URL parameters

  try {
    // Call the service to update the property
    const updatedProperty = await propertyService.updateProperty(
      req.body,
      propertyId,
      userId,
      role
    );

    // Send success response
    res.success(
      updatedProperty, // Data
      `Property ${updatedProperty.property_id} updated successfully`, // Message
      200 // Status Code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || "Failed to update property",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const deleteProperty = async (req, res, next) => {
  const userId = req.token.userId; // Extract user ID from token
  const role = req.token.role; // Extract user role from token
  const propertyId = req.params.propertyId; // Extract property ID from params

  try {
    // Call the service to delete the property
    const result = await propertyService.deletePropertyService(
      propertyId,
      userId,
      role
    );

    // Send success response
    res.success(
      null, // No specific data to return
      result.message, // Success message
      200 // Status code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || "Failed to delete property",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const AdminGetAllProperties = async (req, res, next) => {
  try {
    const userRole = req.token.role;

    // Fetch all properties using the service
    const properties = await propertyService.getAllProperties(userRole);

    // Send success response
    res.success(
      properties, // Data
      "All properties retrieved successfully", // Message
      200 // Status Code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || "Failed to load properties",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const requestTour = async (req, res, next) => {
  try {
    const tenantId = req.token.userId; // Extract tenant ID from token
    const propertyId = req.params.propertyId; // Extract property ID from route params

    // Call the service to process the request
    const tourRequest = await propertyService.requestTourByTenant(
      tenantId,
      propertyId
    );

    // Send success response
    res.success(
      tourRequest, // Data
      `Tour request for property ${propertyId} by user ${tenantId} has been sent`, // Message
      201 // Status Code
    );
  } catch (error) {
    // Forward the error to the centralized error handler
    next(
      new AppError(
        error.message,
        error.statusCode || 500,
        error.details || null
      )
    );
  }
};

const getTourRequests = async (req, res, next) => {
  try {
    const userId = req.token.userId; // Extract user ID from the token

    // Fetch the tour requests
    const tourRequests = await propertyService.getRequestToursByUserId(userId);

    // Send success response
    res.success(
      tourRequests, // Data
      "Tour requests fetched successfully", // Message
      200 // Status code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || "Failed to fetch tour requests",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const acceptTourRequest = async (req, res, next) => {
  try {
    const ownerId = req.token.userId; // Extract owner ID from token
    const requestId = req.params.requestId; // Extract request ID from params

    // Approve the tour request
    const updatedRequest = await propertyService.acceptTourRequestService(
      ownerId,
      requestId
    );

    // Send success response
    res.success(
      updatedRequest, // Data
      `Tour request ${requestId} approved successfully`, // Message
      200 // Status Code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || "Failed to approve the tour request",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const getPropertyById = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const tenantId = req.token?.userId || null; // Check if tenantId is provided
    console.log(tenantId);

    // Fetch property data using the service
    const propertyData = await propertyService.getPropertyByPropertyIdService(
      propertyId,
      tenantId
    );

    // Send success response
    res.success(
      propertyData, // Data
      "Property details fetched successfully", // Message
      200 // Status code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || "Failed to fetch property details",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const getPropertyByIdByAdmin = async (req, res, next) => {
  try {
    const propertyId = req.params.propertyId;

    const propertyData = await propertyService.getPropertyByIdForAdminService(
      propertyId
    );

    res.success(
      propertyData, // Data
      "Property details fetched successfully", // Message
      200 // Status code
    );
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to fetch property details",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  getMyProperties,
  getPropertiesByUserId,
  updateProperty,
  deleteProperty,
  AdminGetAllProperties,
  requestTour,
  getTourRequests,
  acceptTourRequest,
  getPropertyById,
  getPropertyByIdByAdmin
};
