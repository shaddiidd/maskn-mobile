// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => "USR" + Math.floor(1000 + Math.random() * 9000),
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    national_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]+$/, // Optional regex to enforce numeric phone numbers
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reset_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reset_token_expiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    tableName: "users",

    validate: {
      ratingRequiredForUsers() {
        if (
          this.role_id === 1 &&
          (this.rating === null || this.rating === undefined)
        ) {
          throw new Error("Rating is required for regular users");
        }
      },
    },
  }
);

module.exports = User;
