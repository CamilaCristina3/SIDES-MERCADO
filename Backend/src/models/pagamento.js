// src/models/Pagamento.js
const db = require('../config/database')

class Pagamento {
  // Regista uma nova transação de pagamento (Mpesa, eMola, etc.)
  static async registrarPagamento({ pedido_id, transacao_id, metodo_pagamento, valor, status = 'pendente' }) {
    const sql = `
      INSERT INTO pagamentos (pedido_id, transacao_id, metodo_pagamento, valor, status, data_pagamento)
      VALUES (?, ?, ?, ?, ?, NOW())
    `
    const [result] = await db.execute(sql, [pedido_id, transacao_id, metodo_pagamento, valor, status])
    return result.insertId
  }

  // Atualiza o estado da transação (ex: confirmado, falhou, cancelado)
  static async atualizarStatus(transacao_id, status) {
    const sql = `
      UPDATE pagamentos 
      SET status = ?, atualizado_em = NOW()
      WHERE transacao_id = ?
    `
    const [result] = await db.execute(sql, [status, transacao_id])
    return result.affectedRows > 0
  }

  // Busca um pagamento pelo ID de transação
  static async encontrarPorTransacao(transacao_id) {
    const [rows] = await db.execute('SELECT * FROM pagamentos WHERE transacao_id = ?', [transacao_id])
    return rows[0]
  }

  // Busca pagamento ligado a um pedido
  static async encontrarPorPedido(pedido_id) {
    const [rows] = await db.execute('SELECT * FROM pagamentos WHERE pedido_id = ?', [pedido_id])
    return rows[0]
  }

  // Simulação de processamento
  static async simularProcessamento(pedido_id, metodo_pagamento, valor) {
    const transacao_id = `tx_${Date.now()}_${Math.floor(Math.random()*1e6)}`
    // Regista pagamento pendente
    await this.registrarPagamento({ pedido_id, transacao_id, metodo_pagamento, valor, status: 'pendente' })
    // Simula espera
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Atualiza para pago
    await this.atualizarStatus(transacao_id, 'pago')
    return { transacao_id, status: 'pago', metodo_pagamento, valor }
  }
}

module.exports = Pagamento
