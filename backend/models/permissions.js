const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permissions", // Explicitly specify the table name
    timestamps: false, // Disable timestamps if not needed
  }
);

module.exports = Permission