'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TourRequests', {
      request_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => `REQ${Math.floor(100000 + Math.random() * 900000)}`, // Generates REQ + random 6-digit number
      },
      // Foreign key to the Users table (tenant making the request)
      user_id: {
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
          model: 'users', // Assumes a `users` table exists
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // Foreign key to the Properties table (property requested for tour)
      property_id: {
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
          model: 'properties', // Make sure 'Properties' is the actual name of the properties table
          key: 'property_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // Status of the tour request (e.g., pending, approved, declined)
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'declined'),
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TourRequests');
  },
};

