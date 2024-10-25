const express = require("express")
const propertyRouter = express.Router();
const auth = require("../middleware/authentication")

const {addProperty, getAllProperties} = require("../controllers/property")

propertyRouter.post("/addProperty", auth, addProperty)
propertyRouter.get("/",getAllProperties)

module.exports = propertyRouter