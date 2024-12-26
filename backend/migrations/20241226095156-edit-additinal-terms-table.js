"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("contractAdditionalTerms", "terms", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true, // Allow NULL values
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("contractAdditionalTerms", "terms", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false, // Revert back to NOT NULL
    });
  },
};
