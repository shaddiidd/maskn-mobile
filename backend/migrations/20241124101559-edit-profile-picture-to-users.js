'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the 'profile_photo' column type to ARRAY
    await queryInterface.removeColumn('users', 'profile_photo', {
      type: Sequelize.STRING, // Change column to an array of strings
      allowNull: true, // Allow null values
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert 'profile_photo' column back to STRING
    await queryInterface.removeColumn('users', 'profile_photo', {
      type: Sequelize.STRING, // Revert column back to a single string
      allowNull: true, // Keep it nullable
    });
  },
};

