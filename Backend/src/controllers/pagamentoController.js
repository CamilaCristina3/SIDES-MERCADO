// src/controllers/pagamentoController.js
const Pedido = require('../models/Pedido');
const logger = require('../monitoring/logger');

class PagamentoController {
  async processarPagamento(req, res) {
    try {
      const { pedido_id, metodo_pagamento } = req.body;

      if (!pedido_id || !metodo_pagamento) {
        return res.status(400).json({
          success: false,
          message: 'Pedido e método de pagamento são obrigatórios.'
        });
      }

      const resultado = await Pedido.processarPagamento(pedido_id, metodo_pagamento);

      logger.info('Pagamento processado', {
        pedido_id,
        metodo_pagamento,
        transacao_id: resultado.transacao_id
      });

      res.status(200).json({
        success: true,
        message: `Pagamento via ${metodo_pagamento.toUpperCase()} confirmado.`,
        data: resultado
      });
    } catch (error) {
      logger.error('Erro ao processar pagamento:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno no processamento de pagamento'
      });
    }
  }
}

module.exports = new PagamentoController();
