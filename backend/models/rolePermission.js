const { DataTypes } = require("sequelize");
const sequelize = require("../models/db");

const RolePermission = sequelize.define("RolePermission",{ 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',  // References the roles table
          key: 'id',       // References the id column in roles
        },
        onDelete: 'CASCADE',
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'permissions', // References the permissions table
          key: 'id',            // References the id column in permissions
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,                 // Pass the Sequelize instance
      modelName: 'RolePermission', // Model name
      tableName: 'role_permission', // Explicit table name
      timestamps: false,           // No timestamps needed for a join table
    }
)

module.exports = RolePermission