'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('owner_reviews', 'Review_id', 'review_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('owner_reviews', 'review_id', 'Review_id');
  },
};
