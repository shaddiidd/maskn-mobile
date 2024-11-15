const express = require("express");
const propertyRouter = express.Router();
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  addProperty,
  getAllProperties,
  getMyProperties,
  getPropertiesByuserId,
  updateMyProperty,
  deleteProperty,
  AdminGetAllProperties,
  requestTour,
  getTourRequests,
} = require("../controllers/property");

propertyRouter.post(
  "/add-property",
  auth,
  authorization("Apply for Rental"),
  addProperty
);
propertyRouter.get("/", getAllProperties);
propertyRouter.get("/get-property-by-admin", auth, AdminGetAllProperties);
propertyRouter.get("/get-by-user-id", auth, getMyProperties);
propertyRouter.get("/get-by-user-id/:userId", getPropertiesByuserId);
propertyRouter.put("/update-property/:id", auth, updateMyProperty);
propertyRouter.delete("/delete-property/:propertyId", auth, deleteProperty);
propertyRouter.post("/request-tour/:propertyId", auth, requestTour);
propertyRouter.get("/get-tour-requests", auth, getTourRequests);

module.exports = propertyRouter;
