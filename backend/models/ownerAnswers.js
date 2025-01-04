const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");
const User = require("./users"); // Adjust the path to your User model
const Contract = require("./contract"); // Adjust the path to your Contract model
const OwnerRentalExperience = require("./ownerRentalExperience");

const OwnerAnswer = sequelize.define(
  "OwnerAnswer",
  {
    answer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "user_id", // Foreign key to User table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: OwnerRentalExperience, // Associate with OwnerRentalExperience
        key: "id", // Assuming the primary key in OwnerRentalExperience is "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    tableName: "owner_answers",
    timestamps: false, // No updatedAt column
  }
);

// Associations
OwnerAnswer.belongsTo(User, { foreignKey: "owner_id", as: "owner" });
OwnerAnswer.belongsTo(User, { foreignKey: "tenant_id", as: "tenant" });
OwnerAnswer.belongsTo(Contract, { foreignKey: "contract_id", as: "contract" });
OwnerAnswer.belongsTo(OwnerRentalExperience, { foreignKey: "question_id", as: "question" }); // Define association with OwnerRentalExperience


module.exports = OwnerAnswer;
