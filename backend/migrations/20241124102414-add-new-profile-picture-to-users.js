'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add a column 'profile_photo' with an array type
    await queryInterface.addColumn('users', 'profile_photo', {
      type: Sequelize.ARRAY(Sequelize.STRING), // Array of strings for multiple photo URLs
      allowNull: true, // Allow null if no profile photos are uploaded
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'profile_photo' column
    await queryInterface.removeColumn('users', 'profile_photo');
  },
};
