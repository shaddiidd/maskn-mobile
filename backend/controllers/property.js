const propertyService = require("../services/propertyService");
const userService = require("../services/userService");

const addProperty = async (req, res) => {
  const ownerId = req.token.userId; // Correctly fetching userId from token
  const role = req.token.role;

  try {
    const newProperty = await propertyService.createProperty(
      req.body,
      ownerId,
      role,
      req.files
    );

    if (newProperty.success) {
      return res.status(201).json({
        success: true,
        message: "Property added successfully",
        data: newProperty.data,
      });
    }

    // If service returns a failure
    return res.status(400).json({
      success: false,
      message: newProperty.message,
    });
  } catch (error) {
    // Handling unexpected errors
    console.error("Error in addProperty:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllProperties = async (req, res) => {
  const result = await propertyService.getAllProperties();

  if (result) {
    return res.status(200).json({
      success: true,
      message: `all properites`,
      result: result.data,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "failed to load the properties",
      error: error,
    });
  }
};

const getMyProperties = async (req, res) => {
  const userId = req.token.userId; // Extract user ID from token

  try {
    const result = await propertyService.findPropertiesByUserId(userId, userId); // Pass token userId to allow viewing restricted properties

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: `All properties for user ${userId}`,
        result: result.data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to retrieve properties",
        error: result.error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving properties",
      error: error.message,
    });
  }
};


const getPropertiesByUserId = async (req, res) => {
  const userId = req.params.userId; // The target user's ID
  const tokenUserId = req.token?.userId || null; // Extract token user ID, if available

  try {
    const result = await propertyService.findPropertiesByUserId(userId, tokenUserId);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: `All properties for user ${userId}`,
        result: result.data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to retrieve properties",
        error: result.error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving properties",
      error: error.message,
    });
  }
};


const updateMyProperty = async (req, res) => {
  const userId = req.token.userId;
  const id = req.params.id;
  try {
    const result = await propertyService.updateMyProperty(req.body, id);

    if (result) {
      return res.status(200).json({
        success: true,
        message: `updated property ${result.data.property_id} for ${userId}`,
        result: result.data,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "failed to update the property",
        error: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteProperty = async (req, res) => {
  const userId = req.token.userId;

  const propertyId = req.params.propertyId;

  try {
    const result = await propertyService.deletePropertyService(
      propertyId,
      userId
    );

    if (result) {
      return res.status(200).json({
        success: true,
        message: `property ${propertyId} for user ${userId} is deleted`,
        result: result.data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "failed to update the property",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete the property",
      error: error.message,
    });
  }
};

const AdminGetAllProperties = async (req, res) => {
  const userRole = req.token.role;
  const result = await propertyService.getAllProperties(userRole);

  if (result) {
    return res.status(200).json({
      success: true,
      message: `all properites`,
      result: result.data,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "failed to load the properties",
      error: error,
    });
  }
};

const requestTour = async (req, res) => {
  const tenantId = req.token.userId;
  const propertyId = req.params.propertyId;

  const result = await propertyService.requestTourByTenant(
    tenantId,
    propertyId
  );

  try {
    if (result.success) {
      return res.status(201).json({
        success: true,
        message: `Request tour for property ${propertyId} by user ${tenantId} has been sent`,
        result: result.data,
      });
    }

    const statusCode =
      result.message === "user already have a request" ||
      "tour request cant made by owner"
        ? 403
        : 500;
    const errorMessage = result.message || "Failed to make request";

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error:
        statusCode === 500
          ? "An error occurred while processing the request"
          : undefined,
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message, // Use the actual error message
    });
  }
};

const getTourRequests = async (req, res) => {
  const userId = req.token.userId; // Assume user ID comes from an auth token

  try {
    const result = await propertyService.getRequestToursByUserId(userId);
    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tour requests',
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error: error.message,
    });
  }
};

const acceptTourRequest = async (req, res) => {
  const ownerId = req.token.userId;
  const requestId = req.params.requestId;

  const result = await propertyService.acceptTourRequestService(
    ownerId,
    requestId
  );

  if (result.success === true) {
    return res.status(200).json({
      success: true,
      message: `Request for has been approved by owner ${ownerId}`,
      data: result.data,
    });
  } else {
    return res.status(500).json({
      success: false,
      data: result,
    });
  }
};

const getPropertyForApprovedTenant = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const tenantId = req.token.userId;

    // Call the service to fetch the property data
    const result = await propertyService.getPropertyByPropertyIdService(
      propertyId,
      tenantId
    );

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Tenant can view contact info",
        data: result.data, // Return only the relevant data
      });
    }

    return res.status(400).json({
      success: false,
      message: "Unable to fetch property details",
      error: result.message || "Unknown error", // Provide meaningful feedback
    });
  } catch (error) {
    console.error("Error in getPropertyForApprovedTenant:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getPropertyForPublicView = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Call the service to fetch the property data (no tenantId is passed)
    const result = await propertyService.getPropertyByPropertyIdService(
      propertyId,
      null
    );

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Property details fetched successfully",
        data: result.data, // Return only the relevant data
      });
    }

    return res.status(400).json({
      success: false,
      message: "Unable to fetch property details",
      error: result.message || "Unknown error", // Provide meaningful feedback
    });
  } catch (error) {
    console.error("Error in getPropertyForPublicView:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  getMyProperties,
  getPropertiesByUserId,
  updateMyProperty,
  deleteProperty,
  AdminGetAllProperties,
  requestTour,
  getTourRequests,
  acceptTourRequest,
  getPropertyForApprovedTenant,
  getPropertyForPublicView,
};
