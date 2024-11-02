const express = require("express")
const propertyRouter = express.Router();
const auth = require("../middleware/authentication")

const {addProperty, getAllProperties, getMyProperties, getPropertiesByuserId, updateMyProperty} = require("../controllers/property")

propertyRouter.post("/addProperty", auth, addProperty)
propertyRouter.get("/",getAllProperties)
propertyRouter.get("/getByUserId", auth,getMyProperties)
propertyRouter.get("/:userId", getPropertiesByuserId)
propertyRouter.put("/updateProperty/:id", auth, updateMyProperty)

module.exports = propertyRouter