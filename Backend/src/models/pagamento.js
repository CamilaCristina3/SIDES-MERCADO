// src/models/Pagamento.js
const db = require('../config/database');

class Pagamento {
  /**
   * Regista uma nova transação de pagamento (Mpesa, eMola, etc.)
   */
  static async registrarPagamento({ transacao_id, metodo_pagamento, valor, status = 'pendente' }) {
    const query = `
      INSERT INTO pagamentos (transacao_id, metodo_pagamento, valor, status, data_pagamento)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const [result] = await db.execute(query, [transacao_id, metodo_pagamento, valor, status]);
    return result.insertId;
  }

  /**
   * Atualiza o estado da transação (ex: confirmado, falhou, cancelado)
   */
  static async atualizarStatus(transacao_id, status) {
    const query = `
      UPDATE pagamentos 
      SET status = ?, atualizado_em = NOW()
      WHERE transacao_id = ?
    `;
    const [result] = await db.execute(query, [status, transacao_id]);
    return result.affectedRows > 0;
  }

  /**
   * Busca um pagamento pelo ID de transação
   */
  static async encontrarPorTransacao(transacao_id) {
    const [rows] = await db.execute(
      'SELECT * FROM pagamentos WHERE transacao_id = ?',
      [transacao_id]
    );
    return rows[0];
  }

  /**
   * Simulação de integração Mpesa / eMola
   * (gera resposta simbólica para testes)
   */
  static async simularProcessamentoMpesa(transacao_id, valor) {
    console.log(`💳 Simulando pagamento Mpesa para transação ${transacao_id}, valor ${valor} MZN`);
    // Esperar 2 segundos (simulando processamento)
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      transacao_id,
      status: 'pago',
      mensagem: 'Pagamento confirmado (simulado via Mpesa)'
    };
  }
}

module.exports = Pagamento;
