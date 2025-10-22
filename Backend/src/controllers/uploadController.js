// src/controllers/uploadController.js
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure uploads/images directory exists
const uploadsDir = path.join(__dirname, '../../uploads/images')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (_req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname || '')
    cb(null, `img-${unique}${ext}`)
  }
})

function fileFilter(_req, file, cb) {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (allowed.includes(file.mimetype)) return cb(null, true)
  cb(new Error('Tipo de ficheiro não suportado'))
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

// Controller handler
function uploadSingle(req, res) {
  // Multer populates req.file
  if (!req.file) return res.status(400).json({ success: false, message: 'Nenhuma imagem enviada' })
  const filename = req.file.filename
  const urlPath = `/uploads/images/${filename}`
  return res.status(201).json({ success: true, filename, url: urlPath })
}

module.exports = {
  multerUpload: upload.single('image'),
  uploadSingle,
}
