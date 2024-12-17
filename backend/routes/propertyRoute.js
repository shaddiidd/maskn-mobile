const express = require("express");
const propertyRouter = express.Router();
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const upload = require("../middleware/upload") 

const {
  addProperty,
  getAllProperties,
  getMyProperties,
  getPropertiesByUserId,
  updateProperty,
  deleteProperty,
  AdminGetAllProperties,
  requestTour,
  getTourRequests,
  acceptTourRequest,
  getPropertyForApprovedTenant,
  getPropertyForPublicView
} = require("../controllers/property");

propertyRouter.post(
  "/add-property",
  auth, // Authentication middleware
  authorization("Apply for Rental"), // Authorization middleware
  upload.array("photos", 5), // File upload middleware
  addProperty // Controller
);
propertyRouter.get("/", getAllProperties);
propertyRouter.get("/get-property-by-admin", auth, AdminGetAllProperties);
propertyRouter.get("/get-by-user-id", auth, getMyProperties);
propertyRouter.get("/get-by-user-id/:userId", getPropertiesByUserId);
propertyRouter.put("/update-property/:id", auth, updateProperty);
propertyRouter.delete("/delete-property/:propertyId", auth, deleteProperty);
propertyRouter.post("/request-tour/:propertyId", auth, requestTour);
propertyRouter.get("/get-tour-requests", auth, getTourRequests);
propertyRouter.post("/accept-tour-request/:requestId", auth, acceptTourRequest)
propertyRouter.get("/get-property-with-contact-info/:propertyId", auth, getPropertyForApprovedTenant)
propertyRouter.get("/get-property-with-id/:propertyId",getPropertyForPublicView )

module.exports = propertyRouter;
