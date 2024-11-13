'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('TourRequests', 'property_tour_requests');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('property_tour_requests', 'TourRequests');
  }
};

