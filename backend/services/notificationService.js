const Notification = require("../models/notification");
const Token = require("../models/notificationToken");

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

const saveToken = async (userId, notification_token) => {
    let token = await Token.findOne({ where: { user_id: userId } });
  
    if (token) {
      token.notification_token = notification_token;
      await token.save();
    } else {
      token = await Token.create({ user_id: userId, notification_token });
    }
  
    return token;
  };
  
  // Fetch a user's token
  const getUserToken = async (userId) => {
    return await Token.findOne({ where: { user_id: userId } });
  };
  

module.exports = {
  getUserNotifications,
  pushNotification,
  markNotificationAsRead,
  saveToken,
  getUserToken
};
