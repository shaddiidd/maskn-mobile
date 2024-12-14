const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");

const VillageName = sequelize.define(
  "VillageName",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    village_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "village_names", // Explicitly specify table name
    timestamps: true, // Enables createdAt and updatedAt fields
  }
);

module.exports = VillageName;
