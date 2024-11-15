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

module.exports = {
  createProperty,
  getAllProperties,
  findPropertiesByuserId,
  updateMyProperty,
  deletePropertyService,
};
