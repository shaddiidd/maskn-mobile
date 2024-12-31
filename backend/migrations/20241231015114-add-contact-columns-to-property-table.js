'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'additional_contact_info', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust based on your requirements
      comment: 'Additional contact information, such as a phone number or email'
    });

    await queryInterface.addColumn('properties', 'additional_contact_info_name', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust based on your requirements
      comment: 'Name associated with the additional contact information'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('properties', 'additional_contact_info');
    await queryInterface.removeColumn('properties', 'additional_contact_info_name');
  }
};

