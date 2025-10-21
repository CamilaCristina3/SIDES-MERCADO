// src/routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');
const { authMiddleware } = require('../middleware/auth');
const db = require('../config/database');

// ✅ Listar produtos com filtros (controlador principal)
router.get('/', (req, res) => ProdutoController.listar(req, res));

// ✅ Ver detalhes de um produto (via slug)
router.get('/:slug', (req, res) => ProdutoController.ver(req, res));

// ✅ Criar novo produto (Produtor/Admin)
router.post('/', authMiddleware, (req, res) => ProdutoController.criar(req, res));

// ✅ Atualizar produto
router.put('/:id', authMiddleware, (req, res) => ProdutoController.atualizar(req, res));

// ✅ Eliminar produto
router.delete('/:id', authMiddleware, (req, res) => ProdutoController.eliminar(req, res));

/* 
 * 🔹 Rotas diretas de teste (consulta bruta)
 * Apenas para debug e verificação da base de dados
 * Podem ser removidas em produção
 */

// ✅ Listar todos os produtos diretamente do MySQL
router.get('/debug/all', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// ✅ Buscar produto por ID (rota de debug)
router.get('/debug/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

module.exports = router;
