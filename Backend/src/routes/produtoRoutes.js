// src/routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');
const { authMiddleware } = require('../middleware/auth');

// Listar produtos com filtros
router.get('/', (req, res) => ProdutoController.listar(req, res));

// Ver detalhes de um produto (via slug)
router.get('/:slug', (req, res) => ProdutoController.ver(req, res));

// Criar novo produto (Produtor/Admin)
router.post('/', authMiddleware, (req, res) => ProdutoController.criar(req, res));

// Atualizar produto
router.put('/:id', authMiddleware, (req, res) => ProdutoController.atualizar(req, res));

// Eliminar produto
router.delete('/:id', authMiddleware, (req, res) => ProdutoController.eliminar(req, res));

module.exports = router;

