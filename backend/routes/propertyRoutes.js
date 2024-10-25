const express = require("express")
const propertyRouter = express.Router();
const auth = require("../middleware/authentication")

const {addProperty, getAllProperties, getPropertyByUserId} = require("../controllers/property")

propertyRouter.post("/addProperty", auth, addProperty)
propertyRouter.get("/",getAllProperties)
propertyRouter.get("/getByUserId", auth, getPropertyByUserId)


module.exports = propertyRouter