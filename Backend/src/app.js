// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Importar rotas
const utilizadorRoutes = require('./routes/utilizadorRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');

// 🔹 Registrar rotas principais
app.use('/api/utilizadores', utilizadorRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/pagamentos', pagamentoRoutes);

// 🔹 Teste rápido
app.get('/', (req, res) => {
  res.send('✅ SIDES Mercado API (Moçambique) ativa e funcional!');
});

module.exports = app;
