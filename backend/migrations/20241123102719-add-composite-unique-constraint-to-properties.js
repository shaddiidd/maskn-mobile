'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('properties', {
      fields: [
        'village_id',
        'block_id',
        'neighborhood_id',
        'parcel_number',
        'building_number',
        'apartment_number',
        'floor_num',
      ],
      type: 'unique',
      name: 'unique_property_identity', // Custom name for the constraint
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('properties', 'unique_property_identity');
  },
};
