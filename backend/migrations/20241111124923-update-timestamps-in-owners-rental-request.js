'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename `createdAt` to `created_at`
    await queryInterface.renameColumn('owners_rental_request', 'createdAt', 'created_at');

    // Add `updated_at` column
    await queryInterface.addColumn('owners_rental_request', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert `created_at` back to `createdAt`
    await queryInterface.renameColumn('owners_rental_request', 'created_at', 'createdAt');

    // Remove `updated_at` column
    await queryInterface.removeColumn('owners_rental_request', 'updated_at');
  },
};

