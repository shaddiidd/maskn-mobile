const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./users"); // Import the User model

const Notification = sequelize.define(
  "Notification",
  {
    notif_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "user_id", // Reference to `user_id` in the User model
      },
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "notifications",
  }
);

// Define Associations
Notification.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = Notification;
