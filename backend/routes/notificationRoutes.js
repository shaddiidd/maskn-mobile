const express = require("express");
const notificationRouter = express.Router();
const authentication = require("../middleware/authentication");

const { getUserNotifications } = require("../controllers/notification");

notificationRouter.get("/get-notification", authentication, getUserNotifications)

module.exports = notificationRouter