// src/routes/uploadRoutes.js
const express = require('express')
const router = express.Router()
const { authMiddleware, requireRoles } = require('../middleware/auth')
const { multerUpload, uploadSingle } = require('../controllers/uploadController')

// Admin-only image upload (tipo 'A')
router.post('/image', authMiddleware, requireRoles('A'), multerUpload, uploadSingle)

module.exports = router
