const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "roles", // Explicitly specify table name
    timestamps: false, // Disable timestamps if not needed
  }
);

module.exports = Role;
