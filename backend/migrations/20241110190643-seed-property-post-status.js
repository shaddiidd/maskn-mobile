'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('property_post_status', [
      { id: 1, description: 'Active', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, description: 'Pending', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, description: 'Archived', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('property_post_status', null, {});
  },
};

