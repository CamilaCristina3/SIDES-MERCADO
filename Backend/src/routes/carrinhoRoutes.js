// src/routes/carrinhoRoutes.js
const express = require('express');
const router = express.Router();
const CarrinhoController = require('../controllers/carrinhoController');
const { authMiddleware } = require('../middleware/auth');

// ✅ Ver carrinho atual
router.get('/', authMiddleware, (req, res) => CarrinhoController.verCarrinho(req, res));

// ✅ Adicionar item ao carrinho
router.post('/', authMiddleware, (req, res) => CarrinhoController.adicionar(req, res));

// ✅ Atualizar quantidade de item
router.put('/', authMiddleware, (req, res) => CarrinhoController.atualizar(req, res));

// ✅ Remover item
router.delete('/:itemId', authMiddleware, (req, res) => CarrinhoController.remover(req, res));

// ✅ Limpar carrinho
router.delete('/', authMiddleware, (req, res) => CarrinhoController.limpar(req, res));

module.exports = router;
