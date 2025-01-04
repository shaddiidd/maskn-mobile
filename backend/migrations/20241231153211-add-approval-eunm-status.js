'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Contract_status') THEN
          CREATE TYPE "enum_Contract_status" AS ENUM('not signed', 'partialy signed', 'signed', 'expired');
        END IF;

        ALTER TABLE "Contract" ALTER COLUMN "status" TYPE "enum_Contract_status" USING "status"::"enum_Contract_status";

        IF NOT EXISTS (
          SELECT 1
          FROM pg_enum
          WHERE enumlabel = 'pending renewal approval' AND enumtypid = (
            SELECT oid FROM pg_type WHERE typname = 'enum_Contract_status'
          )
        ) THEN
          ALTER TYPE "enum_Contract_status" ADD VALUE 'pending renewal approval';
        END IF;
      END$$;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Enum values cannot be removed in PostgreSQL without recreating the enum type
    // This script reverts the column back to its original state (non-enum, if needed)

    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Contract_status') THEN
          ALTER TABLE "Contract" ALTER COLUMN "status" DROP DEFAULT;

          CREATE TYPE "enum_Contract_status_temp" AS ENUM('not signed', 'partialy signed', 'signed', 'expired');
          ALTER TABLE "Contract" ALTER COLUMN "status" TYPE "enum_Contract_status_temp" USING "status"::text::"enum_Contract_status_temp";

          DROP TYPE "enum_Contract_status";
          ALTER TYPE "enum_Contract_status_temp" RENAME TO "enum_Contract_status";
        END IF;
      END$$;
    `);
  },
};

