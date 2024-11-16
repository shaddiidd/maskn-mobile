'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phone_number', {
      type: Sequelize.STRING,
      //allowNull: false, // The column cannot be null
      unique: true,     // Ensures the column has unique values
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'phone_number');
  },
};


