'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Contract', 'survey_filled', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value set to 0 (false)
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Contract', 'survey_filled');
  },
};
