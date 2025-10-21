const Produto = require('../models/produto');
const Categoria = require('../models/categoria');
const logger = require('../monitoring/logger');

class ProdutoController {
  async listar(req, res) {
    try {
      const produtos = await Produto.findAllPaginated(req.query);
      res.json({ success: true, data: produtos });
    } catch (error) {
      logger.error('Erro ao listar produtos', error);
      res.status(500).json({ success: false, message: 'Erro interno' });
    }
  }

  async ver(req, res) {
    try {
      const produto = await Produto.findBySlug(req.params.slug);
      if (!produto) return res.status(404).json({ success: false, message: 'Produto não encontrado' });
      res.json({ success: true, data: produto });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao carregar produto' });
    }
  }

  async criar(req, res) {
    try {
      const produtoId = await Produto.create({ ...req.body, produtor_id: req.user.id });
      res.status(201).json({ success: true, produtoId });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao criar produto' });
    }
  }

  async atualizar(req, res) {
    try {
      const ok = await Produto.update(req.params.id, req.body);
      res.json({ success: ok });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao atualizar produto' });
    }
  }

  async eliminar(req, res) {
    try {
      const ok = await Produto.delete(req.params.id);
      res.json({ success: ok });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao eliminar produto' });
    }
  }
}

module.exports = new ProdutoController();
