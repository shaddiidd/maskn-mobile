'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Contract', 'contract_pdf', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust this based on your requirement
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Contract', 'contract_pdf', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true, // Adjust this based on your requirement
    });
  },
};
