const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");

const OwnersRentalRequest = sequelize.define(
  "OwnersRentalRequest",
  {
    request_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => `REQ${Math.floor(100000 + Math.random() * 900000)}`, // Generates REQ + random 6-digit number
    },
    user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'users', // Replace with actual users table name if different
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    request_state: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: "owners_rental_request", // Explicitly specify table name
    timestamps: true, // Disable updatedAt if only createdAt is needed
  }
);

module.exports = OwnersRentalRequest;
