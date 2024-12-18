'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('property_tour_requests', 'user_id', 'tenant_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('property_tour_requests', 'tenant_id', 'user_id');
  }
};

