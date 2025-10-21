// backend/config/database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Dica: mantém valores por .env, com defaults seguros p/ dev
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sides_mercado', // <- atualizado
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONN_LIMIT || 10),
  queueLimit: 0,

  // Regionais e compatibilidade
  timezone: process.env.DB_TZ || 'Z', // guarda/obtém em UTC; converte no app
  charset: 'utf8mb4_general_ci',

  // Evita conversões automáticas perigosas
  dateStrings: true,          // DATETIME/DATE como string (formatas no app)
  supportBigNumbers: true,
  bigNumberStrings: true,

  // Opcional: placeholders nomeados (:id) se precisares
  namedPlaceholders: true
});

// Helper simples p/ queries (retorna apenas rows)
async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// Acesso direto ao execute (para quem precisa [rows, fields])
async function execute(sql, params = []) {
  return pool.execute(sql, params);
}

// Obter conexão para transações
async function getConnection() {
  return pool.getConnection();
}

// Health check ao arrancar
async function ping() {
  const conn = await pool.getConnection();
  try {
    await conn.ping();
    // console.log('[DB] ping ok');
  } finally {
    conn.release();
  }
}

// Encerramento gracioso
function closePool() {
  return pool.end();
}

process.on('SIGINT', async () => {
  try {
    await closePool();
  } finally {
    process.exit(0);
  }
});

module.exports = { pool, query, execute, getConnection, ping, closePool };
