'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename column `villag_name` to `village_name`
    await queryInterface.renameColumn('village_names', 'villag_name', 'village_name');
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: Rename column `village_name` back to `villag_name`
    await queryInterface.renameColumn('village_names', 'village_name', 'villag_name');
  },
};


