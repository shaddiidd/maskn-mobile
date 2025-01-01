const notificationService = require("../services/notificationService");
const AppError = require("../utils/AppError");

const getUserNotifications = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await notificationService.getUserNotifications(userId);
    res.success(
      data, // Data
      "Notifications fetched successfully", // Message
      200 // Status code
    );
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to fetch notifications",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const pushNotification = async (req, res, next) => {
  try {
    const { userId, title, body } = req.body;
    const data = await notificationService.pushNotification(userId, title, body);
    res.success(
      data, // Data
      "Notification sent successfully", // Message
      201 // Status code
    );
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to send notification",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const markNotificationAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await notificationService.markNotificationAsRead(id);
    res.success(
      data, // Data
      "Notification marked as read successfully", // Message
      200 // Status code
    );
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to mark notification as read",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const saveToken = async (req, res, next) => {
    try {
      const { userId, notification_token } = req.body;
      const data = await notificationService.saveToken(userId, notification_token);
      res.success(
        data, // Data
        "Token saved successfully", // Message
        200 // Status code
      );
    } catch (error) {
      next(
        new AppError(
          error.message || "Failed to save token",
          error.statusCode || 500,
          error.details
        )
      );
    }
  };
  
  const getUserToken = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = await notificationService.getUserToken(userId);
      res.success(
        data, // Data
        "Token fetched successfully", // Message
        200 // Status code
      );
    } catch (error) {
      next(
        new AppError(
          error.message || "Failed to fetch token",
          error.statusCode || 500,
          error.details
        )
      );
    }
  };
  

module.exports = {
  getUserNotifications,
  pushNotification,
  markNotificationAsRead,
  saveToken,
  getUserToken
};
