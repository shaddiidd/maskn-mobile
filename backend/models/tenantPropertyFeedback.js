const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");

const TenantPropertyFeedback = sequelize.define(
  "TenantPropertyFeedback",
  {
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "tenant_property_feedback",
  }
);

module.exports = TenantPropertyFeedback;
