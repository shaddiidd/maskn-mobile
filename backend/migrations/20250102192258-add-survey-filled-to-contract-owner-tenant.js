'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the `survey_filled` column to `owner_survey_filled`
    await queryInterface.renameColumn('Contract', 'survey_filled', 'owner_survey_filled');

    // Add a new column `tenant_survey_filled` with default value false
    await queryInterface.addColumn('Contract', 'tenant_survey_filled', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the `owner_survey_filled` column back to `survey_filled`
    await queryInterface.renameColumn('Contract', 'owner_survey_filled', 'survey_filled');

    // Remove the `tenant_survey_filled` column
    await queryInterface.removeColumn('Contract', 'tenant_survey_filled');
  },
};
