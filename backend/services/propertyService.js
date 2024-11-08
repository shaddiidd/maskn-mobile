const Property = require("../models/properties");

const createProperty = (property, user_id) => {
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
    mark_as_rented,
  } = property;

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
    mark_as_rented,
  });

  return newProperty;
};

const getAllProperties = async () => {
  try {
    const properites = await Property.findAll();
    return { success: true, data: properites };
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

module.exports = {
  createProperty,
  getAllProperties,
  findPropertiesByuserId,
  updateMyProperty,
  deletePropertyService,
};
