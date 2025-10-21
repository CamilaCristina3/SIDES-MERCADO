const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', (req, res) => ContactController.enviar(req, res));
router.get('/', authMiddleware, (req, res) => ContactController.listar(req, res));

module.exports = router;

