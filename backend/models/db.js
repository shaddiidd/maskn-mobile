const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("maskn_db", "maskn_db_owner", "VFoMb3P5QlSO", {
  host: "ep-late-dew-a2xnq2r1.eu-central-1.aws.neon.tech",
  dialect: "postgres",
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Connection established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
