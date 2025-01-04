const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");
const User = require("./users"); // Import the User model

const Token = sequelize.define(
  "Token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    notification_token: {
      type: DataTypes.STRING,
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
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "tokens",
  }
);

// Define Associations
Token.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = Token;
