const express = require('express');
const router = express.Router();
const FavoritoController = require('../controllers/favoritoController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, (req, res) => FavoritoController.listar(req, res));
router.post('/', authMiddleware, (req, res) => FavoritoController.adicionar(req, res));
router.delete('/:produto_id', authMiddleware, (req, res) => FavoritoController.remover(req, res));

module.exports = router;

