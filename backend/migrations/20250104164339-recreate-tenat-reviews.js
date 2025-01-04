'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tenant_reviews', {
      Review_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal(
          `'REV' || CAST(FLOOR(10000 + RANDOM() * 90000) AS TEXT)`
        ),
      },
      property_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'properties', // Table name for properties
          key: 'property_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tenant_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users', // Table name for users
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      contract_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Contract', // Table name for contracts
          key: 'contract_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      review_text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tenant_reviews');
  },
};
