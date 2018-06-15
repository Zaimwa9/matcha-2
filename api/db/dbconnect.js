const { Pool, Client } = require('pg')

const pool = new Pool ({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'matcha'
})

module.exports = pool;
