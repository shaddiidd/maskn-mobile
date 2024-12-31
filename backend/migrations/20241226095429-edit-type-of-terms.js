"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("contractAdditionalTerms", "terms", {
      type: Sequelize.STRING,
      allowNull: false, // Allow NULL values
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("contractAdditionalTerms", "terms", {
      type: Sequelize.STRING,
      allowNull: true, // Revert back to NOT NULL
    });
  },
};
