"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("contractAdditionalTerms", "terms", "term");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("contractAdditionalTerms", "term", "terms");
  },
};
