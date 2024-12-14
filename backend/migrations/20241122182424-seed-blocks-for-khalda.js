'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert records into the `block_names` table
    await queryInterface.bulkInsert('block_names', [
      {
        block_name: 'تلعة قصر خلدا', // Block 1
        village_id: 1, // ID of 'خلدا'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        block_name: 'خلدا الغربي', // Block 2
        village_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        block_name: 'العوجانية', // Block 3
        village_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        block_name: 'رجوم خلدا', // Block 4
        village_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        block_name: 'خلدا الجنوبي', // Block 5
        village_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the inserted records in case of rollback
    await queryInterface.bulkDelete('block_names', {
      block_name: { [Sequelize.Op.in]: ['تلعة قصر خلدا', 'خلدا الغربي', 'العوجانية', 'رجوم خلدا', 'خلدا الجنوبي'] },
      village_id: 120,
    });
  },
};

