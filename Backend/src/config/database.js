import mysql from 'mysql2'

// conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'sides_mercado',
})

db.connect((err) => {
  if (err) throw err
  console.log('✅ Conectado ao banco de dados sides_mercado!')
})
