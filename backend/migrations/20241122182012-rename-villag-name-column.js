'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert records into the `village_names` table
    await queryInterface.bulkInsert('village_names', [
      {
        village_name: '120 -خلدا', // Village Name          // Custom ID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        village_name: '121 -دابوق', // Village Name             // Custom ID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the inserted records in case of rollback
    await queryInterface.bulkDelete('village_names', {
      id: { [Sequelize.Op.in]: [120, 121] }, // Match the IDs
    });
  },
};
