// Centraliza conexão MySQL em modo compatível com CommonJS
// Exporta helpers: query, execute, getConnection, ping
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '0000',
  database: process.env.DB_NAME || 'sides_mercado',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params)
  return rows
}

async function execute(sql, params = []) {
  return pool.execute(sql, params)
}

async function getConnection() {
  return pool.getConnection()
}

async function ping() {
  const conn = await pool.getConnection()
  await conn.ping()
  conn.release()
  return true
}

module.exports = { pool, query, execute, getConnection, ping }
