const express = require("express")
const propertyRouter = express.Router();
const auth = require("../middleware/authentication")

const {addProperty, getAllProperties, getMyProperties, getPropertiesByuserId, updateMyProperty} = require("../controllers/property")

propertyRouter.post("/add-property", auth, addProperty)
propertyRouter.get("/",getAllProperties)
propertyRouter.get("/get-by-user-id", auth,getMyProperties)
propertyRouter.get("/get-by-user-id/:userId", getPropertiesByuserId)
propertyRouter.put("/update-property/:id", auth, updateMyProperty)

module.exports = propertyRouter