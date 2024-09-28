const { Pool } = require('pg');
const pool = new Pool({
  user: 'maskn_db_owner',
  host: 'ep-late-dew-a2xnq2r1.eu-central-1.aws.neon.tech',
  database: 'maskn_db',
  password: 'VFoMb3P5QlSO',
  port: 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false // Ignore SSL certificate errors
  }
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
