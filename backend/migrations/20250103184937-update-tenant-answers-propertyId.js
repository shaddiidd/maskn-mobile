'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change property_id column type to STRING and add foreign key constraint
    await queryInterface.changeColumn('tenant_answers', 'property_id', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'properties', // Name of the referenced table
        key: 'property_id', // Key in the properties table to reference
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert property_id column back to its original state
    await queryInterface.changeColumn('tenant_answers', 'property_id', {
      type: Sequelize.STRING, // Adjust to the original type if different
      allowNull: true, // Original allowNull state
    });
  },
};
