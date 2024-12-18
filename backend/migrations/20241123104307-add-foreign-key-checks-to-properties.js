'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign key for block_id
    await queryInterface.addConstraint('properties', {
      fields: ['block_id'],
      type: 'foreign key',
      name: 'fk_block_id_properties',
      references: {
        table: 'block_names',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    // Add foreign key for neighborhood_id
    await queryInterface.addConstraint('properties', {
      fields: ['neighborhood_id'],
      type: 'foreign key',
      name: 'fk_neighborhood_id_properties',
      references: {
        table: 'neighborhood_numbers',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('properties', 'fk_block_id_properties');
    await queryInterface.removeConstraint('properties', 'fk_neighborhood_id_properties');
  },
};

