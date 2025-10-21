// src/routes/pagamentoRoutes.js
const express = require('express');
const router = express.Router();
const PagamentoController = require('../controllers/pagamentoController');
const { authMiddleware } = require('../middleware/auth');

// ✅ Processar pagamento Mpesa / eMola (simulado)
router.post('/', authMiddleware, (req, res) => PagamentoController.processarPagamento(req, res));

module.exports = router;
