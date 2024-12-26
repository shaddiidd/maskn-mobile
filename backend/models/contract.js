const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");
const User = require("../models/users");
const Property = require("./properties");

const Contract = sequelize.define(
  "Contract",
  {
    contract_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => "CTR" + Math.floor(10000 + Math.random() * 90000),
    },
    owner_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "user_id", // Reference to user_id in User model
      },
      allowNull: false,
    },
    tenant_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "user_id", // Reference to user_id in User model
      },
      allowNull: false,
    },
    property_id: {
      type: DataTypes.STRING,
      references: {
        model: "Property",
        key: "property_id",
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("partialy signed", "signed", "expired"),
      allowNull: false,
      defaultValue: "partialy sigend",
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contract_pdf:{
        type:DataTypes.STRING,
        allowNull : true
    },

  },
  {
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deletedAt",
    tableName: "Contract",
  }
);

Contract.belongsTo(User, { foreignKey: "owner_id", as: "owner" });
Contract.belongsTo(User, { foreignKey: "tenant_id", as: "tenant" });
Contract.belongsTo(Property, { foreignKey: "property_id", as: "property" });

module.exports = Contract;
