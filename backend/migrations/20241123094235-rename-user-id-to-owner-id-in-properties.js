'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the user_id column to owner_id
    await queryInterface.renameColumn('properties', 'user_id', 'owner_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the owner_id column back to user_id
    await queryInterface.renameColumn('properties', 'owner_id', 'user_id');
  },
};
