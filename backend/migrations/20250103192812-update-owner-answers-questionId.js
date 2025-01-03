'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign key constraint to `question_id` in `owner_answers` table
    await queryInterface.changeColumn('owner_answers', 'question_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'owner_rental_experience', // Referenced table
        key: 'question_id', // Primary key in the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the foreign key constraint and revert column to its previous state
    await queryInterface.changeColumn('owner_answers', 'question_id', {
      type: Sequelize.INTEGER,
      allowNull: false, // Adjust to original constraints if different
    });
  },
};

