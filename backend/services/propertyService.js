const Property = require("../models/properties");
const TourRequest = require("../models/tourRequests");
const User = require("../models/users");
const NeighborhoodNumber = require("../models/neighborhoodNumber");
const VillageName = require("../models/villageName");
const BlockName = require("../models/blockName");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const AppError = require("../utils/AppError");
const { filterFields } = require("../utils/propertyUtils");
const sequelize = require("../models/db");

const createProperty = async (property, ownerId, role, files) => {
  // Check if the user has the proper role to create a property
  if (role !== 2) {
    throw new AppError("Unauthorized: Only owners can add properties", 403);
  }

  const {
    description,
    title,
    address,
    location,
    area,
    is_furnished,
    floor_num,
    bedroom_num,
    bathroom_num,
    property_age,
    water_meter_subscription_number,
    electricity_meter_reference_number,
    price,
    rental_period,
    village_id,
    block_id,
    neighborhood_id,
    parcel_number,
    building_number,
    apartment_number,
  } = property;

  // Default values
  const post_status = 2; // Default post status
  const rental_status = 0; // Default rental status

  try {
    // Handle file uploads
    const photoUrls = files.map((file) => file.path);

    // Create a new property record in the database
    const newProperty = await Property.create({
      owner_id: ownerId,
      description,
      title,
      address,
      location,
      area,
      is_furnished: is_furnished.lengthk ? true : false,
      floor_num,
      bedroom_num,
      bathroom_num,
      property_age,
      water_meter_subscription_number,
      electricity_meter_reference_number,
      price,
      rental_period,
      village_id,
      block_id,
      neighborhood_id,
      parcel_number,
      building_number,
      apartment_number,
      mark_as_rented: rental_status,
      post_status_id: post_status,
      photos: photoUrls,
    });

    return newProperty; // Return the created property directly
  } catch (error) {
    throw new AppError("Failed to create property", 500, {
      details: error.message,
    });
  }
};

const getAllProperties = async (userRole = null) => {
  try {
    let properties;

    // Admin role (3) fetches all properties
    if (userRole === 3) {
      properties = await Property.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["first_name", "last_name"],
          },
          {
            model: VillageName,
            as: "village",
            attributes: ["village_name"],
          },
          {
            model: NeighborhoodNumber,
            as: "neighborhood",
            attributes: ["name"],
          },
          {
            model: BlockName,
            as: "block",
            attributes: ["block_name"],
          },
        ],
      });
    } else {
      // Regular users fetch only available properties
      properties = await Property.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["first_name", "last_name"],
          },
          {
            model: VillageName,
            as: "village",
            attributes: ["village_name"],
          },
          {
            model: NeighborhoodNumber,
            as: "neighborhood",
            attributes: ["name"],
          },
          {
            model: BlockName,
            as: "block",
            attributes: ["block_name"],
          },
        ],
        where: { post_status_id: 1, mark_as_rented: 0 },
      });
    }

    return properties; // Return properties directly
  } catch (error) {
    throw new AppError("Failed to load properties", 500, {
      details: error.message,
    });
  }
};

const findPropertiesByUserId = async (userId, tokenUserId = null) => {
  try {
    // Define the base condition for fetching properties
    const whereCondition = { owner_id: userId };

    // Apply filtering for non-owners (restrict data)
    if (tokenUserId !== userId) {
      whereCondition.post_status_id = { [Op.ne]: 2 }; // Exclude post_status_id = 2
      whereCondition.mark_as_rented = { [Op.ne]: 1 }; // Exclude rented properties
    }

    // Fetch properties from the database
    const properties = await Property.findAll({ where: whereCondition });

    return properties; // Return properties directly
  } catch (error) {
    throw new AppError("Failed to retrieve properties", 500, {
      details: error.message,
    });
  }
};

const updateProperty = async (updatedProperty, propertyId, userId, role) => {
  try {
    const property = await Property.findByPk(propertyId);

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    if (role !== 3 && property.owner_id !== userId) {
      throw new AppError("Unauthorized: You do not own this property", 403);
    }

    // Allowed fields for regular users
    const allowedFieldsForOwners = [
      "description",
      "title",
      "address",
      "location",
      "area",
      "is_furnished",
      "floor_num",
      "bedroom_num",
      "bathroom_num",
      "property_age",
      "water_meter_subscription_number",
      "electricity_meter_reference_number",
      "price",
      "rental_period",
      "village_id",
      "block_id",
      "neighborhood_id",
      "parcel_number",
      "building_number",
      "apartment_number",
    ];

    // Filter fields based on user role
    const filteredUpdates =
      role === 3
        ? updatedProperty // Admins can update any field
        : filterFields(updatedProperty, allowedFieldsForOwners);

    if (role === 3 && filteredUpdates.hasOwnProperty("post_status_id")) {
      if (property.mark_as_rented === 1) {
        throw new AppError(
          "Cannot change post_status_id when the property is marked as rented",
          400
        );
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      throw new AppError("No valid fields to update", 400);
    }

    // Update and save property
    Object.assign(property, filteredUpdates);
    const updatedData = await property.save();

    return updatedData;
  } catch (error) {
    throw new AppError("Failed to update the property", 500, {
      details: error.message,
    });
  }
};

const deletePropertyService = async (propertyId, userId, role) => {
  try {
    // Admins (role 3) can delete any property
    const whereCondition =
      role === 3
        ? { property_id: propertyId }
        : { property_id: propertyId, owner_id: userId }; // Owners can only delete their properties

    const deletedCount = await Property.destroy({
      where: whereCondition,
    });

    if (deletedCount === 0) {
      throw new AppError("Property not found or unauthorized access", 404);
    }

    return {
      success: true,
      message: `Property ${propertyId} deleted successfully`,
    };
  } catch (error) {
    throw new AppError("Failed to delete the property", 500, {
      details: error.message,
    });
  }
};

const requestTourByTenant = async (tenantId, propertyId) => {
  try {
    // Find the property
    const property = await Property.findOne({
      where: {
        property_id: propertyId, // Assuming `id` is the primary key field
        post_status_id: 1,
        mark_as_rented: 0,
      },
    });

    if (!property) {
      throw new AppError(
        "Property not found, rented or not approved by admin",
        404
      );
    }

    const ownerId = property.owner_id;

    // Prevent the owner from requesting a tour
    if (tenantId === ownerId) {
      throw new AppError(
        "Tour request cannot be made by the property owner",
        403
      );
    }

    // Check if a tour request already exists
    const requestExist = await TourRequest.findOne({
      where: {
        tenant_id: tenantId,
        property_id: propertyId,
      },
    });

    if (requestExist) {
      throw new AppError(
        "User already has a pending tour request for this property",
        403
      );
    }

    // Create the new tour request
    const newTourRequest = await TourRequest.create({
      tenant_id: tenantId,
      property_id: propertyId,
      owner_id: ownerId,
    });

    return newTourRequest; // Return created request data
  } catch (error) {
    throw new AppError(error.message || "Failed to process tour request", 500);
  }
};

const getRequestToursByUserId = async (userId) => {
  try {
    const requests = await TourRequest.findAll({
      where: {
        [Op.or]: [{ owner_id: userId }, { tenant_id: userId }],
      },
      include: [
        {
          model: User,
          as: "owner", // Assuming a relationship alias
          attributes: ["first_name", "last_name", "profile_photo"],
        },
        {
          model: User,
          as: "tenant",
          attributes: ["first_name", "last_name", "profile_photo"],
        },
        {
          model: Property,
          as: "property",
          attributes: ["title"],
        },
      ],
    });

    return requests; // Return the fetched tour requests directly
  } catch (error) {
    throw new AppError("Failed to fetch tour requests", 500, {
      details: error.message,
    });
  }
};

const acceptTourRequestService = async (ownerId, requestId) => {
  try {
    // Check if the request exists and belongs to the owner
    const requestExist = await TourRequest.findOne({
      where: { request_id: requestId, owner_id: ownerId },
    });

    if (!requestExist) {
      throw new AppError("Request does not exist or unauthorized access", 404);
    }

    // Update the status to 'approved'
    const [rowsUpdated, [updatedRequest]] = await TourRequest.update(
      { status: "approved" },
      {
        where: { request_id: requestId, owner_id: ownerId },
        returning: true, // Return the updated record
      }
    );

    return updatedRequest; // Return the updated request data
  } catch (error) {
    throw new AppError("Failed to approve the tour request", 500, {
      details: error.message,
    });
  }
};

// const getPropertyByPropertyIdService = async (propertyId, tenantId) => {
//   try {
//     // Fetch the property with necessary details
//     const property = await Property.findOne({
//       where: {
//         property_id: propertyId,
//         post_status_id: 2,
//         mark_as_rented: 0,
//       },
//       include: [
//         { model: VillageName, as: "village", attributes: ["village_name"] },
//         { model: NeighborhoodNumber, as: "neighborhood", attributes: ["name"] },
//         { model: BlockName, as: "block", attributes: ["block_name"] },
//       ],
//     });

//     if (!property) {
//       throw new AppError("Property not found or not approved by admin", 404);
//     }

//     // Default values
//     let additionalContactInfo = null;
//     let additionalContactInfoName = null;
//     let requestStatus = null;

//     // Check tenant's request status
//     if (tenantId) {
//       const request = await TourRequest.findOne({
//         where: { property_id: propertyId, tenant_id: tenantId },
//       });

//       if (request) {
//         requestStatus = request.status;

//         // Include contact info only if the request is approved
//         if (request.status === "approved") {
//           additionalContactInfo = property.additional_contact_info;
//           additionalContactInfoName = property.additional_contact_info_name;
//         }
//       }
//     }

//     // Return formatted response
//     return {
//       success: true,
//       message: "Property details fetched successfully",
//       data: {
//         ...property.toJSON(),
//         additional_contact_info: additionalContactInfo,
//         additional_contact_info_name: additionalContactInfoName,
//         request_status: requestStatus, // Include request status
//       },
//     };
//   } catch (error) {
//     throw new AppError("Failed to fetch property details", 500, {
//       details: error.message,
//     });
//   }
// };

const getPropertyByPropertyIdService = async (propertyId, tenantId) => {
  try {
    // Fetch the property without including the owner initially
    const property = await Property.findOne({
      where: {
        property_id: propertyId,
        post_status_id: 1, // Approved by admin
        mark_as_rented: 0, // Not rented
      },
      include: [
        { model: VillageName, as: "village", attributes: ["village_name"] },
        { model: NeighborhoodNumber, as: "neighborhood", attributes: ["name"] },
        { model: BlockName, as: "block", attributes: ["block_name"] },
      ],
    });

    if (!property) {
      throw new AppError("Property not found or not approved by admin", 404);
    }

    let additionalContactInfo = null;
    let additionalContactInfoName = null;
    let requestStatus = null;
    let ownerDetails = null;

    // Check tenant's request status
    if (tenantId) {
      const request = await TourRequest.findOne({
        where: { property_id: propertyId, tenant_id: tenantId },
      });

      if (request) {
        requestStatus = request.status;

        // Fetch owner details only if the request is approved
        if (request.status === "approved") {
          const owner = await User.findOne({
            where: { user_id: property.owner_id },
            attributes: [
              "first_name",
              "last_name",
              "profile_photo",
              "phone_number",
              "username",
            ],
          });

          ownerDetails = owner
            ? {
                first_name: owner.first_name,
                last_name: owner.last_name,
                profile_photo: owner.profile_photo,
                phone_number: owner.phone_number,
                username: owner.username,
              }
            : null;

          additionalContactInfo = property.additional_contact_info;
          additionalContactInfoName = property.additional_contact_info_name;
        }
      }
    }

    // Return formatted response
    return {
      success: true,
      message: "Property details fetched successfully",
      data: {
        ...property.toJSON(),
        additional_contact_info: additionalContactInfo,
        additional_contact_info_name: additionalContactInfoName,
        request_status: requestStatus, // Include request status
        owner_details: ownerDetails, // Include owner details if approved
      },
    };
  } catch (error) {
    throw new AppError("Failed to fetch property details", 500, {
      details: error.message,
    });
  }
};

const getPropertyByIdForAdminService = async (propertyId) => {
  try {
    const property = await Property.findByPk(propertyId, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["first_name", "last_name"],
        },
        {
          model: VillageName,
          as: "village",
          attributes: ["village_name"],
        },
        {
          model: NeighborhoodNumber,
          as: "neighborhood",
          attributes: ["name"],
        },
        {
          model: BlockName,
          as: "block",
          attributes: ["block_name"],
        },
      ],
    });

    if (!property) {
      throw new AppError(
        "Property not found, rented or not approved by admin",
        404
      );
    }

    return { property };
  } catch (error) {
    throw new AppError("Failed to fetch property details", 500, {
      details: error.message,
    });
  }
};

const getAllVillagesService = async () => {
  try {
    const villages = await VillageName.findAll();
    return { villages }; // Empty array if no villages
  } catch (error) {
    throw new AppError("Failed to fetch villages", 500, {
      details: error.message,
    });
  }
};

const getBlockAndNieghbourhoodByIdService = async (villageId) => {
  try {
    const blocks = await BlockName.findAll({
      where: { village_id: villageId },
      include: [
        {
          model: NeighborhoodNumber,
          as: "neighborhoods", // Use the alias defined in the association
          attributes: ["name"],
        },
      ],
    });

    if (!blocks || blocks.length === 0) {
      throw new AppError("Blocks and neighborhoods not found", 404);
    }

    return { blocks };
  } catch (error) {
    throw new AppError("Failed to fetch blocks and neighborhoods", 500, {
      details: error.message,
    });
  }
};

const filterProperty = async (body) => {
  try {
    const { location, price_range, bathroom_num, bedroom_num, is_furnished } =
      body;

    // Base conditions: not rented and approved
    const filters = {
      mark_as_rented: 0, // Property is not rented
      post_status_id: 1, // Property is approved
    };

    // Optional filters based on request body
    if (location) {
      filters.location = location; // Filter by location
    }

    if (price_range) {
      const range = price_range.split("-").map(Number); // Split "500-1500" into [500, 1500]
      if (range.length !== 2 || isNaN(range[0]) || isNaN(range[1])) {
        throw new AppError("Invalid price range format. Use 'min-max'.", 400);
      }
      filters.price = { [Sequelize.Op.between]: range }; // Filter by price range
    }

    if (bathroom_num) {
      filters.bathroom_num = bathroom_num; // Filter by bathroom count
    }

    if (bedroom_num) {
      filters.bedroom_num = bedroom_num; // Filter by bedroom count
    }

    if (typeof is_furnished !== "undefined") {
      if (typeof is_furnished !== "boolean") {
        throw new AppError(
          "Invalid value for is_furnished. Expected true or false.",
          400
        );
      }
      filters.is_furnished = is_furnished; // Filter by furnished status
    }

    // Query database with all filters
    const properties = await Property.findAll({ where: filters });

    // Return the filtered properties
    return { properties };
  } catch (error) {
    throw new AppError("Failed to fetch properties", 500, {
      details: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  findPropertiesByUserId,
  updateProperty,
  deletePropertyService,
  requestTourByTenant,
  getRequestToursByUserId,
  acceptTourRequestService,
  getPropertyByPropertyIdService,
  getPropertyByIdForAdminService,
  getAllVillagesService,
  getBlockAndNieghbourhoodByIdService,
  filterProperty,
};
