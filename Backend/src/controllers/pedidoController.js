// backend/controllers/pedidoController.js
const Pedido = require('../models/Pedido');
const Carrinho = require('../models/Carrinho');
const logger = require('../monitoring/logger');

class PedidoController {
  /**
   * Criar novo pedido (checkout)
   */
  async criarPedido(req, res) {
    try {
      const userId = req.user.id; // assumindo que o utilizador vem autenticado (middleware JWT)
      const {
        endereco_entrega,
        provincia,
        distrito,
        metodo_pagamento,
        transacao_id // opcional se vier de integração Mpesa real
      } = req.body;

      // 1️⃣ Buscar carrinho do utilizador
      const carrinho = await Carrinho.findByUtilizadorId(userId);
      if (!carrinho.itens || carrinho.itens.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Carrinho vazio. Adicione produtos antes de finalizar a compra.'
        });
      }

      // 2️⃣ Criar o pedido
      const pedido = await Pedido.criarPedido({
        utilizador_id: userId,
        endereco_entrega,
        provincia,
        distrito,
        metodo_pagamento,
        transacao_id,
        itens: carrinho.itens.map(item => ({
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco: item.preco
        }))
      });

      // 3️⃣ Limpar o carrinho após confirmar pedido
      await Carrinho.limparCarrinho(userId);

      // 4️⃣ Simular processamento de pagamento (mock Mpesa/eMola)
      const pagamento = await Pedido.processarPagamento(pedido.id, metodo_pagamento);

      logger.info('Pedido criado com sucesso', { pedidoId: pedido.id, utilizador: userId });

      return res.status(201).json({
        success: true,
        message: 'Pedido criado com sucesso',
        data: {
          ...pedido,
          pagamento
        }
      });
    } catch (error) {
      logger.error('Erro ao criar pedido', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  /**
   * Listar pedidos do utilizador logado
   */
  async listarPedidos(req, res) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10 } = req.query;

      const result = await Pedido.encontrarPorUtilizador(userId, {
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error('Erro ao listar pedidos', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao listar pedidos'
      });
    }
  }

  /**
   * Ver detalhes de um pedido
   */
  async verPedido(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.encontrarPorId(id);

      if (!pedido) {
        return res.status(404).json({
          success: false,
          message: 'Pedido não encontrado'
        });
      }

      // Verificar se pertence ao utilizador logado
      if (pedido.utilizador_id !== req.user.id && req.user.tipo !== 'A') {
        return res.status(403).json({
          success: false,
          message: 'Sem permissão para aceder a este pedido'
        });
      }

      res.json({
        success: true,
        data: pedido
      });
    } catch (error) {
      logger.error('Erro ao obter pedido', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Cancelar um pedido (repor stock)
   */
  async cancelarPedido(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.encontrarPorId(id);

      if (!pedido) {
        return res.status(404).json({
          success: false,
          message: 'Pedido não encontrado'
        });
      }

      if (pedido.utilizador_id !== req.user.id && req.user.tipo !== 'A') {
        return res.status(403).json({
          success: false,
          message: 'Sem permissão para cancelar este pedido'
        });
      }

      const sucesso = await Pedido.cancelarPedido(id);

      if (!sucesso) {
        return res.status(400).json({
          success: false,
          message: 'Não foi possível cancelar o pedido'
        });
      }

      res.json({
        success: true,
        message: 'Pedido cancelado com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao cancelar pedido', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = new PedidoController();
