'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Contract", {
      contract_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.literal(
          "CONCAT('CTR', FLOOR(10000 + (RANDOM() * 90000)))"
        ),
      },
      owner_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "users", // Adjust if your users table is named differently
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      tenant_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      property_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "properties",
          key: "property_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("partialy signed", "signed", "expired"),
        allowNull: false,
        defaultValue: "partialy signed",
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      contract_pdf: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Contract");
  },
};
