const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");

const propertyPostStatus = sequelize.define(
  "propertyPostStatus",

  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: "propertyPostStatus",
    tableName: "property_post_status", // Explicitly specify the table name
  }
);
module.exports = propertyPostStatus