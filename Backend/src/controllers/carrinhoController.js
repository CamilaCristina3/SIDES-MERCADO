const Carrinho = require('../models/Carrinho');
const logger = require('../monitoring/logger');

class CarrinhoController {
  async verCarrinho(req, res) {
    try {
      const carrinho = await Carrinho.findByUtilizadorId(req.user.id);
      res.json({ success: true, data: carrinho });
    } catch (error) {
      logger.error('Erro ao carregar carrinho', error);
      res.status(500).json({ success: false, message: 'Erro interno' });
    }
  }

  async adicionar(req, res) {
    try {
      const item = await Carrinho.adicionarItem(req.user.id, req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao adicionar item' });
    }
  }

  async atualizar(req, res) {
    try {
      const { itemId, quantidade } = req.body;
      const ok = await Carrinho.atualizarQuantidade(req.user.id, itemId, quantidade);
      res.json({ success: ok });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao atualizar item' });
    }
  }

  async remover(req, res) {
    try {
      const { itemId } = req.params;
      const ok = await Carrinho.removerItem(req.user.id, itemId);
      res.json({ success: ok });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao remover item' });
    }
  }

  async limpar(req, res) {
    try {
      const ok = await Carrinho.limparCarrinho(req.user.id);
      res.json({ success: ok });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao limpar carrinho' });
    }
  }
}

module.exports = new CarrinhoController();
