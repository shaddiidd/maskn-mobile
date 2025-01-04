const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");
const OwnerAnswer = require("./ownerAnswers")

const OwnerRentalExperience = sequelize.define(
  "ownerRentalExperience",
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
    tableName: "owner_rental_experience",
  }
);

// OwnerRentalExperience.hasMany(OwnerAnswer, { foreignKey: "question_id", as: "answers" });


module.exports = OwnerRentalExperience;
