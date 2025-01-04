const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./users"); // Import User model
const Contract = require("./contract"); // Import Contract model

const OwnerReview = sequelize.define(
  "OwnerReview",
  {
    Review_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () =>
        "REV" + Math.floor(10000 + Math.random() * 90000), // Generate REV + random 5-digit number
    },
    tenant_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users", // References the Users table
        key: "user_id",
      },
    },
    owner_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users", // References the Users table
        key: "user_id",
      },
    },
    contract_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Contract", // References the Contracts table
        key: "contract_id",
      },
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "owner_reviews", // Specify the table name
    timestamps: true, // Enable createdAt and updatedAt
    underscored: true,
  }
);

// Define associations
OwnerReview.belongsTo(User, {
  foreignKey: "tenant_id",
  as: "tenant",
});

OwnerReview.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner",
});

OwnerReview.belongsTo(Contract, {
  foreignKey: "contract_id",
  as: "contract",
});

User.hasMany(OwnerReview, {
  foreignKey: "tenant_id",
  as: "tenant_reviews_owner",
});

User.hasMany(OwnerReview, {
  foreignKey: "owner_id",
  as: "owner_reviews",
});

Contract.hasMany(OwnerReview, {
  foreignKey: "contract_id",
  as: "contract_reviews_owner",
});

module.exports = OwnerReview;