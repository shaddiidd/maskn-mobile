const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Adjust the path to your database connection file

const ContractTerm = sequelize.define(
  'ContractTerm',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    term: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'contract_terms', // Explicitly specify the table name
    timestamps: true, // Enable createdAt and updatedAt columns
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
);

module.exports = ContractTerm;
