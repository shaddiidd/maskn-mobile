'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('owner_answers', {
      answer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      owner_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users', // Reference to the `users` table
          key: 'user_id', // Primary key in the `users` table
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      property_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      response_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('owner_answers');
  },
};
