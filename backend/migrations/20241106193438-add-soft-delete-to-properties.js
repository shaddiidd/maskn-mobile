'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
   up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

   down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('properties', 'deletedAt');
  }
};
