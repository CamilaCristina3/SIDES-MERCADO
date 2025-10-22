import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import produtosRoutes from './routes/produtos.js' // 👈 rotas de produtos
import { ping } from './config/database.js'        // 👈 conexão com DB

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

// ✅ Testar conexão com o banco
ping()
  .then(() => console.log('✅ Conectado à base de dados sides_mercado'))
  .catch((err) => console.error('❌ Erro ao conectar ao banco:', err))

// ✅ Servir imagens da pasta uploads
app.use('/images', express.static(path.join(__dirname, 'uploads/images')))

// ✅ Rotas da API
app.use('/api/produtos', produtosRoutes)

// Iniciar servidor
app.listen(5000, () => {
  console.log('🚀 Servidor rodando em http://localhost:5000')
})
