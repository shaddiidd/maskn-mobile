'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'tenant_id', {
      type: Sequelize.STRING,
      allowNull: true, // Allows null since it will be set when the property is rented
      references: {
        model: 'users', // Name of the related table
        key: 'user_id', // Primary key in the related table
      },
      onUpdate: 'CASCADE', // Ensures updates are cascaded
      onDelete: 'SET NULL', // Sets tenant_id to null if the referenced user is deleted
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('properties', 'tenant_id');
  },
};
