'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Alter the start_date column to allow NULL values
    await queryInterface.changeColumn('Contract', 'start_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    // Alter the end_date column to allow NULL values
    await queryInterface.changeColumn('Contract', 'end_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the start_date column to NOT NULL
    await queryInterface.changeColumn('Contract', 'start_date', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    // Revert the end_date column to NOT NULL
    await queryInterface.changeColumn('Contract', 'end_date', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
