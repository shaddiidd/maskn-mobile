const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");
const BlockName = require("./blockName"); // Import BlockName model

const NeighborhoodNumber = sequelize.define(
  "NeighborhoodNumber",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    block_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BlockName, // Reference the BlockName model
        key: "id",
      },
    },
  },
  {
    tableName: "neighborhood_numbers", // Specify the table name
    timestamps: true, // Enable createdAt and updatedAt
  }
);

// Define associations
NeighborhoodNumber.belongsTo(BlockName, { foreignKey: "block_id", as: "block" });
BlockName.hasMany(NeighborhoodNumber, { foreignKey: "block_id", as: "neighborhoods" });

module.exports = NeighborhoodNumber;
