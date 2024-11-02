// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../models/db'); 

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => 'USR' + Math.floor(1000 + Math.random() * 9000) 
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  national_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reset_token : {
    type : DataTypes.TEXT,
    allowNull : true,
  }, 
  reset_token_expiration :{
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName:"users"
});

module.exports = User;
