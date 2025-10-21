// src/routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoriaController');
const { authMiddleware } = require('../middleware/auth');

// ✅ Listar todas as categorias
router.get('/', (req, res) => CategoriaController.listar(req, res));

// ✅ Criar categoria (admin)
router.post('/', authMiddleware, (req, res) => CategoriaController.criar(req, res));

// ✅ Atualizar categoria
router.put('/:id', authMiddleware, (req, res) => CategoriaController.atualizar(req, res));

// ✅ Eliminar categoria
router.delete('/:id', authMiddleware, (req, res) => CategoriaController.eliminar(req, res));

module.exports = router;
