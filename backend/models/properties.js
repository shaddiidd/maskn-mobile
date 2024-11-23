const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./users');
const PropertyPostStatus = require('./propertyPostStatus');
const VillageName = require('./villageName'); // Import the VillageName model
const BlockName = require('./blockName'); // Import the BlockName model
const NeighborhoodNumber = require('./neighborhoodNumber'); // Import the NeighborhoodNumber model

const Property = sequelize.define(
  'Property',
  {
    property_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => 'PROP' + Math.floor(10000 + Math.random() * 90000),
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'user_id',
      },
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_furnished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    floor_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bedroom_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bathroom_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    property_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    water_meter_subscription_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures uniqueness
    },
    electricity_meter_reference_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures uniqueness
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rental_period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mark_as_rented: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_status_id: {
      type: DataTypes.STRING,
      references: {
        model: PropertyPostStatus,
        key: 'id',
      },
      allowNull: false,
    },
    village_id: {
      type: DataTypes.INTEGER,
      references: {
        model: VillageName,
        key: 'id',
      },
      allowNull: false,
    },
    block_id: {
      type: DataTypes.INTEGER,
      references: {
        model: BlockName,
        key: 'id',
      },
      allowNull: false,
    },
    neighborhood_id: {
      type: DataTypes.INTEGER,
      references: {
        model: NeighborhoodNumber,
        key: 'id',
      },
      allowNull: false,
    },
    parcel_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    building_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apartment_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deletedAt',
    tableName: 'properties',
  }
);

// Define Associations
Property.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Property.belongsTo(VillageName, { foreignKey: 'village_id', as: 'village' });
Property.belongsTo(BlockName, { foreignKey: 'block_id', as: 'block' });
Property.belongsTo(NeighborhoodNumber, { foreignKey: 'neighborhood_id', as: 'neighborhood' });
Property.belongsTo(PropertyPostStatus, { foreignKey: 'post_status_id', as: 'status' });

module.exports = Property;
