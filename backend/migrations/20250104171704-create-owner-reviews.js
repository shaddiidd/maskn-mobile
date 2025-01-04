'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('owner_reviews', {
      Review_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal(
          `'REV' || CAST(FLOOR(10000 + RANDOM() * 90000) AS TEXT)`
        ),
      },
      tenant_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users', // References the Users table
          key: 'user_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      owner_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users', // References the Users table
          key: 'user_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      contract_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Contract', // References the Contracts table
          key: 'contract_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('owner_reviews');
  },
};
