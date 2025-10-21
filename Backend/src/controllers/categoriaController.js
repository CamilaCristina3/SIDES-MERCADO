const Categoria = require('../models/categoria');
const logger = require('../monitoring/logger');

class CategoriaController {
  async listar(req, res) {
    try {
      const categorias = await Categoria.findAll();
      res.json({ success: true, data: categorias });
    } catch (error) {
      logger.error('Erro ao listar categorias', error);
      res.status(500).json({ success: false, message: 'Erro interno' });
    }
  }

  async criar(req, res) {
    try {
      const id = await Categoria.create(req.body);
      res.status(201).json({ success: true, message: 'Categoria criada com sucesso', id });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao criar categoria' });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const success = await Categoria.update(id, req.body);
      res.json({ success, message: success ? 'Categoria atualizada' : 'Não foi possível atualizar' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao atualizar categoria' });
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const success = await Categoria.delete(id);
      res.json({ success, message: success ? 'Categoria eliminada' : 'Não foi possível eliminar' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao eliminar categoria' });
    }
  }
}

module.exports = new CategoriaController();
