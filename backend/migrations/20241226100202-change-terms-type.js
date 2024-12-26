"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("contractAdditionalTerms", "term", {
      type: Sequelize.TEXT,
      allowNull: false, // Allow NULL values
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("contractAdditionalTerms", "term", {
      type: Sequelize.TEXT,
      allowNull: true, // Revert back to NOT NULL
    });
  },
};

