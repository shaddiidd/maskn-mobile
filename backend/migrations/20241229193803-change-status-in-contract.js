'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('contracts', 'status', {
      type: Sequelize.ENUM('partialy signed', 'signed', 'expired', 'not signed'),
      allowNull: false,
      defaultValue: 'not signed',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting to the previous ENUM without 'not signed'
    await queryInterface.changeColumn('contracts', 'status', {
      type: Sequelize.ENUM('partialy signed', 'signed', 'expired'),
      allowNull: false,
      defaultValue: 'partialy signed',
    });
  },
};


