'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add `contract_id` column to `tenant_answers`
    await queryInterface.addColumn('tenant_answers', 'contract_id', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Contract', // Name of the contracts table
        key: 'contract_id', // Primary key in the contracts table
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Add `contract_id` column to `owner_answers`
    await queryInterface.addColumn('owner_answers', 'contract_id', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Contract', // Name of the contracts table
        key: 'contract_id', // Primary key in the contracts table
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove `contract_id` column from `tenant_answers`
    await queryInterface.removeColumn('tenant_answers', 'contract_id');

    // Remove `contract_id` column from `owner_answers`
    await queryInterface.removeColumn('owner_answers', 'contract_id');
  },
};
