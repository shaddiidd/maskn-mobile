const { Pool } = require("pg");

const pool = new Pool({
    connectionString : process.env.DB_URL, 
    ssl: {
      rejectUnauthorized: false, // Disable SSL certificate verification
    },
});

pool
  .connect()
  .then((res) => {
    console.log(`DB connected to ${res.database}`);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;
