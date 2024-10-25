const express = require("express")
const propertyRouter = express.Router();
const auth = require("../middleware/authentication")

const {addProperty, getAllProperties, getMyProperties, getPropertiesByuserId} = require("../controllers/property")

propertyRouter.post("/addProperty", auth, addProperty)
propertyRouter.get("/",getAllProperties)
propertyRouter.get("/getByUserId", auth,getMyProperties)
propertyRouter.get("/:userId", getPropertiesByuserId)

module.exports = propertyRouter