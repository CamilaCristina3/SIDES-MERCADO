const Morada = require('../models/Morada');
const logger = require('../monitoring/logger');

class MoradaController {
  async listar(req, res) {
    try {
      const data = await Morada.listar(req.user.id);
      res.json({ success: true, data });
    } catch (error) {
      logger.error('Erro ao listar moradas', error);
      res.status(500).json({ success: false, message: 'Erro ao listar moradas' });
    }
  }

  async criar(req, res) {
    try {
      const id = await Morada.criar(req.user.id, req.body);
      res.status(201).json({ success: true, id });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao criar morada' });
    }
  }

  async atualizar(req, res) {
    try {
      const ok = await Morada.atualizar(req.user.id, req.params.id, req.body);
      res.json({ success: ok });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao atualizar morada' });
    }
  }

  async remover(req, res) {
    try {
      const ok = await Morada.remover(req.user.id, req.params.id);
      res.json({ success: ok });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao remover morada' });
    }
  }
}

module.exports = new MoradaController();

