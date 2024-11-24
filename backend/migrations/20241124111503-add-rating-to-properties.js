'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'rating', {
      type: Sequelize.DECIMAL(3, 2), // Decimal type with up to 3 digits, 2 of which are after the decimal point
      allowNull: false, // Set to true if it's optional, or false if it must always have a value
      defaultValue: 5.00, // Default value can be set to a number if needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('properties', 'rating');
  },
};
