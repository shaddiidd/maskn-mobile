'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add village_id column
    const tableName = 'properties';

    // Check if water_meter_subscription_number exists before adding it
    const columns = await queryInterface.describeTable(tableName);
    if (!columns['water_meter_subscription_number']) {
      await queryInterface.addColumn(tableName, 'water_meter_subscription_number', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      });
    }

    // Check if electricity_meter_reference_number exists before adding it
    if (!columns['electricity_meter_reference_number']) {
      await queryInterface.addColumn(tableName, 'electricity_meter_reference_number', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      });
    }

    // Add other new columns (only if they don't already exist)
    if (!columns['village_id']) {
      await queryInterface.addColumn(tableName, 'village_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'village_names',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }

    if (!columns['block_id']) {
      await queryInterface.addColumn(tableName, 'block_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'block_names',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }

    if (!columns['neighborhood_id']) {
      await queryInterface.addColumn(tableName, 'neighborhood_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'neighborhood_numbers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }

    if (!columns['parcel_number']) {
      await queryInterface.addColumn(tableName, 'parcel_number', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }

    if (!columns['building_number']) {
      await queryInterface.addColumn(tableName, 'building_number', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }

    if (!columns['apartment_number']) {
      await queryInterface.addColumn(tableName, 'apartment_number', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }

    // Remove property_national_number column if it exists
    if (columns['property_national_number']) {
      await queryInterface.removeColumn(tableName, 'property_national_number');
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableName = 'properties';

    await queryInterface.removeColumn(tableName, 'village_id');
    await queryInterface.removeColumn(tableName, 'block_id');
    await queryInterface.removeColumn(tableName, 'neighborhood_id');
    await queryInterface.removeColumn(tableName, 'parcel_number');
    await queryInterface.removeColumn(tableName, 'building_number');
    await queryInterface.removeColumn(tableName, 'apartment_number');
    await queryInterface.removeColumn(tableName, 'water_meter_subscription_number');
    await queryInterface.removeColumn(tableName, 'electricity_meter_reference_number');

    // Restore property_national_number column
    await queryInterface.addColumn(tableName, 'property_national_number', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};





