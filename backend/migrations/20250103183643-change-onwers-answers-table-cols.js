'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename property_id column to tenant_id
    await queryInterface.renameColumn('owner_answers', 'property_id', 'tenant_id');

    // Change tenant_id column type to STRING and add foreign key constraint
    await queryInterface.changeColumn('owner_answers', 'tenant_id', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'users', // Name of the referenced table
        key: 'user_id', // Key in the users table to reference
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert tenant_id column back to property_id
    await queryInterface.renameColumn('owner_answers', 'tenant_id', 'property_id');

    // Change property_id column type back to the original type (if known)
    await queryInterface.changeColumn('owner_answers', 'property_id', {
      type: Sequelize.STRING, // Adjust to the original type if different
      allowNull: true,
    });
  },
};

