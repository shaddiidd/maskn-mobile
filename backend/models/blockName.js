const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");
const VillageName = require("./villageName"); // Import the VillageName model

const BlockName = sequelize.define(
  "BlockName",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    block_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    village_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: VillageName, // Model name of the Villages
        key: "id", // Primary key in the VillageNames table
      },
    },
  },
  {
    tableName: "block_names", // Explicitly specify table name
    timestamps: true, // Enables createdAt and updatedAt fields
  }
);

// Define associations
BlockName.belongsTo(VillageName, { foreignKey: "village_id", as: "village" });
VillageName.hasMany(BlockName, { foreignKey: "village_id", as: "blocks" });

module.exports = BlockName;
