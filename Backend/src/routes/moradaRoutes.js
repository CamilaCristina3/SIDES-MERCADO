const express = require('express');
const router = express.Router();
const MoradaController = require('../controllers/moradaController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, (req, res) => MoradaController.listar(req, res));
router.post('/', authMiddleware, (req, res) => MoradaController.criar(req, res));
router.put('/:id', authMiddleware, (req, res) => MoradaController.atualizar(req, res));
router.delete('/:id', authMiddleware, (req, res) => MoradaController.remover(req, res));

module.exports = router;

