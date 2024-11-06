const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./users');

const Property = sequelize.define('properties',{
    property_id : {
       type : DataTypes.STRING,
       primaryKey : true,
       defaultValue : () => 'PROP' + Math.floor(10000 + Math.random() * 90000) 
    },
    user_id :{
        type :DataTypes.STRING,
        references :{
            model : User,
            key : 'user_id',
        },
        allowNull : false,
    },
    property_national_number :{
        type :DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    description :{
        type :DataTypes.STRING,
        allowNull : false,        
    },
    title :{
        type :DataTypes.STRING,
        allowNull : false,   
    },
    address :{
        type :DataTypes.STRING,
        allowNull : false,    
    },
    location :{
        type :DataTypes.STRING,
        allowNull : false, 
    },
    area : {
        type :DataTypes.STRING,
        allowNull : false,
    },
    is_furnished : {
        type :DataTypes.BOOLEAN,
        allowNull : false,
    },
    floor_num : {
        type :DataTypes.INTEGER,
        allowNull : false, 
    },
    bedroom_num : {
        type :DataTypes.INTEGER,
        allowNull : false, 
    },
    bathroom_num : {
        type :DataTypes.INTEGER,
        allowNull : false, 
    },
    property_age :{
        type :DataTypes.INTEGER,
        allowNull : false, 
    },
    water_meter_subscription_number : {
        type :DataTypes.STRING,
        allowNull : false, 
    },
    electricity_meter_reference_number : {
        type :DataTypes.STRING,
        allowNull : false, 
    },
    price : {
        type :DataTypes.STRING,
        allowNull : false, 
    },
    rental_period : {
        type :DataTypes.STRING,
        allowNull : false, 
    },
    mark_as_rented : {
        type :DataTypes.INTEGER,
        allowNull : false, 
    }, 
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deletedAt',
    tableName:"properties"
  })

module.exports = Property