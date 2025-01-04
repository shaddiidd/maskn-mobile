const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");
const Property = require("./properties"); // Import Property model
const User = require("./users"); // Import User model
const Contract = require("./contract"); // Import Contract model

const TenantReview = sequelize.define(
  "TenantReview",
  {
    Review_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => "REV" + Math.floor(10000 + Math.random() * 90000),
    },
    property_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Property, // Reference the Property model
        key: "property_id",
      },
    },
    tenant_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User, // Reference the User model
        key: "user_id",
      },
    },
    contract_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Contract, // Reference the Contract model
        key: "contract_id",
      },
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "tenant_reviews", // Specify the table name
    timestamps: true, // Enable createdAt and updatedAt
    underscored: true
  }
);

// Define associations
TenantReview.belongsTo(Property, { foreignKey: "property_id", as: "property" });
TenantReview.belongsTo(User, { foreignKey: "tenant_id", as: "tenant" });
TenantReview.belongsTo(Contract, { foreignKey: "contract_id", as: "contract" });

Property.hasMany(TenantReview, { foreignKey: "property_id", as: "reviews" });
User.hasMany(TenantReview, { foreignKey: "tenant_id", as: "tenant_reviews" });
Contract.hasMany(TenantReview, { foreignKey: "contract_id", as: "contract_reviews_tenant" });

module.exports = TenantReview;
