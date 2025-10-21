const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

router.post('/login', (req, res) => AuthController.login(req, res));
router.post('/logout', authMiddleware, (req, res) => AuthController.logout(req, res));
router.post('/forgot-password', (req, res) => AuthController.forgotPassword(req, res));
router.post('/reset-password', (req, res) => AuthController.resetPassword(req, res));
router.put('/password', authMiddleware, (req, res) => AuthController.changePassword(req, res));

module.exports = router;

