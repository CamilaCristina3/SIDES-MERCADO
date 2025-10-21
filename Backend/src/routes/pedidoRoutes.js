// src/routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedidoController');
const { authMiddleware } = require('../middleware/auth');

// ✅ Criar novo pedido (checkout)
router.post('/', authMiddleware, (req, res) => PedidoController.criarPedido(req, res));

// ✅ Listar pedidos do utilizador
router.get('/', authMiddleware, (req, res) => PedidoController.listarPedidos(req, res));

// ✅ Ver detalhes de um pedido
router.get('/:id', authMiddleware, (req, res) => PedidoController.verPedido(req, res));

// ✅ Cancelar pedido
router.put('/:id/cancelar', authMiddleware, (req, res) => PedidoController.cancelarPedido(req, res));

module.exports = router;
