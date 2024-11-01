const propertyService = require("../services/propertyService");

const addProperty = async (req, res) => {
  const user_id = req.token.userId;

  try {
    const newProperty = await propertyService.createProperty(req.body, user_id);

    res.status(201).json({
      success: true,
      message: "property added successfully",
      user: newProperty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
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
   const userId = req.token.userId

   const result = await propertyService.findPropertiesByuserId(userId)

   if (result) {
    return res.status(200).json({
        success : true,
        message : `all properites for user ${userId}`,
        result : result.data
    })
   } else {
    return res.status(403).json({
            success : false,
            message : "token is invaild or expierd",
            error : error
    })
   }
};

const getPropertiesByuserId = async(req, res) => {
  const userId = req.params.userId

   const result = await propertyService.findPropertiesByuserId(userId)

   if (result) {
    return res.status(200).json({
        success : true,
        message : `all properites for user ${userId}`,
        result : result.data
    })
   } else {
    return res.status(500).json({
            success : false,
            message : "failed to load the properties",
            error : error
    })
}
};

const updateMyProperty = async(req, res) =>{
    const userId = req.token.userId
    const id = req.params.id

        const result = await propertyService.updateMyProperty(req.body, id)

        if(result){
            return res.status(200).json({
                success : true,
                message : `updated property ${result.data.property_id} for ${userId}`,
                result : result.data
            })
        }else{
            return res.status(500).json({
                success: false,
                message: "failed to update the property",
                error: error,
              });
        }

}

module.exports = {
  addProperty,
  getAllProperties,
  getMyProperties,
  getPropertiesByuserId,
  updateMyProperty
};
