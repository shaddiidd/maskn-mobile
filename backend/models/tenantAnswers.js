const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");
const User = require("./users"); // Adjust the path to your User model
const Contract = require("./contract"); // Adjust the path to your Contract model
const Property = require("./properties");

const TenantAnswer = sequelize.define(
  "TenantAnswer",
  {
    answer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tenant_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "user_id", // Foreign key to User table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    property_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Property,
        key: "property_id", // Foreign key to User table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    response_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    contract_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Contract,
        key: "contract_id", // Foreign key to Contract table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "tenant_answers",
    timestamps: false, // No updatedAt column
  }
);

// Associations
TenantAnswer.belongsTo(User, { foreignKey: "tenant_id", as: "tenant" });
TenantAnswer.belongsTo(Contract, { foreignKey: "contract_id", as: "contract" });
TenantAnswer.belongsTo(Property, { foreignKey: "property_id", as: "property" })

module.exports = TenantAnswer;
