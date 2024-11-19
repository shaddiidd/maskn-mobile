'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('property_tour_requests', 'owner_id', {
      type: Sequelize.TEXT,
      allowNull: false,
      references: {
        model: 'users', // Assumes there is a Users table; replace if necessary
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('property_tour_requests', 'owner_id');
  }
};
