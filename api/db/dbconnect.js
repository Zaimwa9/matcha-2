const { Pool, Client } = require('pg')

const pool = new Pool ({
  host: 'localhost',
  user: 'root',
  database: 'matcha'
})

module.exports = pool;