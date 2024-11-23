'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all blocks associated with the village "خلدا" (village_id = 120)
    const blocks = await queryInterface.sequelize.query(
      `SELECT id FROM block_names WHERE village_id = 1`, // Adjust the village_id if different
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Prepare neighborhood data for insertion
    const neighborhoods = blocks.map((block) => ({
      name: 'لا يوجد حي', // Neighborhood name
      block_id: block.id, // Associate with each block
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert the neighborhood data
    await queryInterface.bulkInsert('neighborhood_numbers', neighborhoods);
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: Delete the inserted neighborhoods
    await queryInterface.bulkDelete('neighborhood_numbers', {
      name: 'لا يوجد حي', // Match only the inserted records
    });
  },
};
