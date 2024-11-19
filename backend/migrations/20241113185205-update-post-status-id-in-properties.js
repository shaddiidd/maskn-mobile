'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update `post_status_id` to 1 for all records in the `properties` table
    await queryInterface.bulkUpdate('properties', 
      { post_status_id: 1 }, // Set post_status_id to 1
      { post_status_id: null } // Only update records where post_status_id is null, or remove this line to update all records
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the `post_status_id` to null for all records in the `properties` table
    await queryInterface.bulkUpdate('properties', 
      { post_status_id: null },
      { post_status_id: 1 } // Only revert records where post_status_id was set to 1
    );
  }
};
