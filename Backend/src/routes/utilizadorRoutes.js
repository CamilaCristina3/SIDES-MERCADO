// src/routes/utilizadorRoutes.js
const express = require('express');
const router = express.Router();
const UtilizadorController = require('../controllers/UtilizadorController');
const { authMiddleware } = require('../middleware/auth');

// Rota de registo
router.post('/register', (req, res) => UtilizadorController.register(req, res));

// Rota de listagem (admin)
router.get('/', authMiddleware, (req, res) => UtilizadorController.listar(req, res));

// Perfil do utilizador logado
router.get('/perfil', authMiddleware, (req, res) => UtilizadorController.perfil(req, res));

// Atualizar dados do perfil
router.put('/atualizar', authMiddleware, (req, res) => UtilizadorController.atualizar(req, res));

// Admin: alterar estado
router.put('/:id/estado', authMiddleware, (req, res) => UtilizadorController.alterarEstado(req, res));

// Admin: alterar role/tipo
router.put('/:id/role', authMiddleware, (req, res) => UtilizadorController.alterarRole(req, res));

module.exports = router;
