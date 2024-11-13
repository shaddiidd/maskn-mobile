const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");

const TourRequest = sequelize.define(
  "TourRequest",
  {
    request_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => `REQ${Math.floor(100000 + Math.random() * 900000)}`, // Generates REQ + random 6-digit number
      },
      // Foreign key to the Users table (tenant making the request)
      user_id: {
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
          model: 'users', // Assumes a `users` table exists
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // Foreign key to the Properties table (property requested for tour)
      property_id: {
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
          model: 'properties', // Make sure 'Properties' is the actual name of the properties table
          key: 'property_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'declined'),
      allowNull: false,
      defaultValue: 'pending',
    },
    notification_sent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "TourRequest",
    tableName: "tour_requests", // Explicitly specify the table name
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);

module.exports = TourRequest;
