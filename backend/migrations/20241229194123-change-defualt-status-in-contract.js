'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new value to the ENUM type
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Contract_status') THEN
          CREATE TYPE "enum_Contract_status" AS ENUM ('partialy signed', 'signed', 'expired', 'not signed');
        ELSE
          ALTER TYPE "enum_Contract_status" ADD VALUE IF NOT EXISTS 'not signed';
        END IF;
      END$$;
    `);

    // Update the column to use the updated ENUM type
    await queryInterface.changeColumn('Contract', 'status', {
      type: Sequelize.ENUM('partialy signed', 'signed', 'expired', 'not signed'),
      allowNull: false,
      defaultValue: 'not signed', // Set the default value to 'not signed'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback the ENUM type changes by recreating the type without 'not signed'
    await queryInterface.changeColumn('Contract', 'status', {
      type: Sequelize.ENUM('partialy signed', 'signed', 'expired'),
      allowNull: false,
      defaultValue: 'partialy signed', // Revert default value to 'partialy signed'
    });

    // Remove the 'not signed' value from the ENUM type if needed
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Contract_status') THEN
          DELETE FROM pg_enum
          WHERE enumlabel = 'not signed'
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_Contract_status');
        END IF;
      END$$;
    `);
  },
};

