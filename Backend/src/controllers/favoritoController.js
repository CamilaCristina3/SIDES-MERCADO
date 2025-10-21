const Favorito = require('../models/Favorito');
const logger = require('../monitoring/logger');

class FavoritoController {
  async listar(req, res) {
    try {
      const data = await Favorito.listar(req.user.id);
      res.json({ success: true, data });
    } catch (error) {
      logger.error('Erro ao listar favoritos', error);
      res.status(500).json({ success: false, message: 'Erro ao listar favoritos' });
    }
  }

  async adicionar(req, res) {
    try {
      const { produto_id } = req.body;
      const id = await Favorito.adicionar(req.user.id, produto_id);
      res.status(201).json({ success: true, id });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao adicionar favorito' });
    }
  }

  async remover(req, res) {
    try {
      const { produto_id } = req.params;
      const ok = await Favorito.remover(req.user.id, produto_id);
      res.json({ success: ok });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao remover favorito' });
    }
  }
}

module.exports = new FavoritoController();

