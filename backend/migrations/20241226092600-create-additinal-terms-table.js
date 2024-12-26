"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contractAdditionalTerms", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      contract_id: {
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
          model: "Contract", // Parent table name
          key: "contract_id", // Primary key in the parent table
        },
        onDelete: "CASCADE", // Ensure deletion of related terms when a contract is deleted
        onUpdate: "CASCADE",
      },
      terms: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("contractAdditionalTerms");
  },
};
