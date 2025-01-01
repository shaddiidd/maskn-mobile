const Notification = require("../models/notification");

// Fetch all notifications for a user
const getUserNotifications = async (userId) => {
  return await Notification.findAll({
    where: { user_id: userId },
    order: [["created_at", "DESC"]],
  });
};

// Create and push a notification
const pushNotification = async (userId, title, body) => {
  return await Notification.create({
    user_id: userId,
    title,
    body,
    isRead: false,
  });
};

// Mark a notification as read
const markNotificationAsRead = async (notificationId) => {
  const notification = await Notification.findByPk(notificationId);
  if (!notification) {
    throw new Error("Notification not found");
  }

  notification.isRead = true;
  await notification.save();
  return notification;
};

module.exports = {
  getUserNotifications,
  pushNotification,
  markNotificationAsRead,
};
