const Property = require("../models/properties");
const TourRequest = require("../models/tourRequests");
const User = require("../models/users")

const createProperty = (property, user_id, role) => {
  if (role !== 2) {
    return { success: false, message: "Unauthorized" };
  }
  const {
    property_national_number,
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
  } = property;

  const post_status = 2;

  const rental_status = 0;

  const newProperty = Property.create({
    property_national_number,
    user_id,
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
    mark_as_rented: rental_status,
    post_status_id: post_status,
  });

  return newProperty;
};

const getAllProperties = async (userRole = null) => {
  console.log(userRole);

  try {
    if (userRole == 3) {
      const properites = await Property.findAll();
      console.log("prop", properites);

      return { success: true, data: properites };
    } else {
      const properites = await Property.findAll({
        where: { post_status_id: 1 },
      });
      console.log("prop", properites);
      return { success: true, data: properites };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};

const findPropertiesByuserId = async (userId) => {
  try {
    const properites = await Property.findOne({ where: { user_id: userId } });
    return { success: true, data: properites };
  } catch (error) {
    return { success: false, error: error };
  }
};

const updateMyProperty = async (updatedProperty, propertyId) => {
  try {
    const property = await Property.findByPk(propertyId);

    if (property) {
      Object.assign(property, updatedProperty);
      const data = await property.save();
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};

const deletePropertyService = async (propertyId, userId) => {
  try {
    const property = await Property.destroy({
      where: { property_id: propertyId, user_id: userId },
    });

    if (property) {
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};

const requestTourByTenant = async (tenantId, propertyId) => {
  try {
    const property = await Property.findByPk(propertyId);

    if (!property) {
      return { success: false, message: "Property not found" };
    }

    const ownerId = property.dataValues.user_id;

    if (tenantId === ownerId) {
      return { success: false, message: "tour request cant made by owner" };
    }
    const requestExist = await TourRequest.findOne({
      where: {
        tenant_id: tenantId,
        property_id: propertyId,
      },
    });

    if (requestExist) {
      return { success: false, message: "user already have a request" };
    }

    const newTourRequest = await TourRequest.create({
      tenant_id: tenantId,
      property_id: propertyId,
      owner_id: ownerId,
    });

    return { success: true, data: newTourRequest };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getOwnerRequestTours = async (ownerId) => {
  try {
    const requests = await TourRequest.findAll({
      where: { owner_id: ownerId },
    });

    return { success: true, data: requests };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const acceptTourRequestService = async (ownerId, requestId) => {
  try {
    const requestExist = await TourRequest.findOne({
      where: { request_id: requestId, owner_id: ownerId },
    });

    if (requestExist) {
      const [rowsUpdated, [updatedRequest]] = await TourRequest.update(
        { status: "approved" },
        {
          where: { owner_id: ownerId, request_id: requestId },
          returning: true, // Fetch the updated record
        }
      );

      return { success: true, data: updatedRequest };
    }

    return { success: false, message: "Request does not exist" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getPropertyByPropertyIdService = async (propertyId, tenantId) => {
  try {
    // Fetch the property by primary key
    const property = await Property.findByPk(propertyId);

    // If property is not found, return an error response
    if (!property) {
      return { success: false, message: "Property not found" };
    }

    // If tenantId is provided and not null
    if (tenantId) {
      // Check if an approved tour request exists for the tenant and property
      const requestExist = await TourRequest.findOne({
        where: { property_id: propertyId, tenant_id: tenantId, status: "approved" },
      });

      // If request exists and is approved, include contact information
      if (requestExist) {
        const propertyWithContactInfo = await Property.findOne({
          where: { property_id: propertyId }, // Fixed: Use correct field for `Property` lookup
          include: [
            {
              model: User,
              attributes: ["phone_number"],
            },
          ],
        });

        return { success: true, data: propertyWithContactInfo };
      }
    }

    // Return the property without contact information
    return { success: true, data: property };
  } catch (error) {
    return { success: false, error: error.message };
  }
};


module.exports = {
  createProperty,
  getAllProperties,
  findPropertiesByuserId,
  updateMyProperty,
  deletePropertyService,
  requestTourByTenant,
  getOwnerRequestTours,
  acceptTourRequestService,
  getPropertyByPropertyIdService,
};
