// migration file: add_ad_status_id_to_properties.js

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('properties', 'post_status_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'property_post_status',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.removeColumn('properties', 'ad_status_id');
    },
  };
  