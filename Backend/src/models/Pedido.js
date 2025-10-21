// src/models/Pedido.js
const db = require('../config/database');
const Pagamento = require('./pagamento');

class Pedido {
  /**
   * Criar novo pedido com transação (checkout)
   */
  static async criarPedido(pedidoData) {
    const {
      utilizador_id,
      total,
      endereco_entrega,
      provincia,
      distrito,
      metodo_pagamento,
      transacao_id = null,
      itens
    } = pedidoData;

    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // 1️⃣ Criar pedido
      const [pedidoResult] = await connection.execute(
        `INSERT INTO pedidos (utilizador_id, total, endereco_entrega, provincia, distrito, metodo_pagamento)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [utilizador_id, total, endereco_entrega, provincia, distrito, metodo_pagamento]
      );

      const pedido_id = pedidoResult.insertId;

      // 2️⃣ Adicionar itens e atualizar stock
      for (const item of itens) {
        await connection.execute(
          `INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco)
           VALUES (?, ?, ?, ?)`,
          [pedido_id, item.produto_id, item.quantidade, item.preco]
        );

        // Atualiza o stock (trigger lógica também pode ser usada)
        await connection.execute(
          'UPDATE produtos SET stock = stock - ? WHERE id = ? AND stock >= ?',
          [item.quantidade, item.produto_id, item.quantidade]
        );
      }

      // 3️⃣ Confirmar transação no BD
      await connection.commit();

      // 4️⃣ Criar pagamento simbólico (Mpesa/eMola)
      const pagamento = await Pagamento.simularProcessamento(
        pedido_id,
        metodo_pagamento,
        total
      );

      // 5️⃣ Atualizar status do pedido
      await db.execute(
        'UPDATE pedidos SET status = ?, codigo = ? WHERE id = ?',
        ['pago', pagamento.transacao_id, pedido_id]
      );

      return {
        id: pedido_id,
        utilizador_id,
        total,
        endereco_entrega,
        provincia,
        distrito,
        metodo_pagamento,
        pagamento
      };
    } catch (error) {
      await connection.rollback();
      console.error('❌ Erro ao criar pedido:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Encontrar todos os pedidos de um utilizador (paginado)
   */
  static async encontrarPorUtilizador(utilizadorId, options = { page: 1, limit: 10 }) {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    const [countResult] = await db.execute(
      'SELECT COUNT(*) as total FROM pedidos WHERE utilizador_id = ?',
      [utilizadorId]
    );
    const total = countResult[0].total;

    const [rows] = await db.execute(
      `SELECT * FROM pedidos
       WHERE utilizador_id = ?
       ORDER BY data_criacao DESC
       LIMIT ? OFFSET ?`,
      [utilizadorId, limit, offset]
    );

    for (let pedido of rows) {
      const [itens] = await db.execute(
        `SELECT ip.*, p.nome, p.slug, p.imagem
         FROM itens_pedido ip
         JOIN produtos p ON ip.produto_id = p.id
         WHERE ip.pedido_id = ?`,
        [pedido.id]
      );
      pedido.itens = itens;

      const pagamento = await Pagamento.encontrarPorPedido(pedido.id);
      pedido.pagamento = pagamento || null;
    }

    return {
      pedidos: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Encontrar pedido por ID (com itens e pagamento)
   */
  static async encontrarPorId(id) {
    const [rows] = await db.execute('SELECT * FROM pedidos WHERE id = ?', [id]);
    if (rows.length === 0) return null;

    const pedido = rows[0];

    const [itens] = await db.execute(
      `SELECT ip.*, p.nome, p.slug, p.imagem
       FROM itens_pedido ip
       JOIN produtos p ON ip.produto_id = p.id
       WHERE ip.pedido_id = ?`,
      [id]
    );
    pedido.itens = itens;

    const pagamento = await Pagamento.encontrarPorPedido(id);
    pedido.pagamento = pagamento || null;

    return pedido;
  }

  /**
   * Atualizar status de um pedido
   */
  static async atualizarStatus(id, status) {
    const statusValidos = ['pendente', 'pago', 'enviado', 'entregue', 'cancelado'];
    if (!statusValidos.includes(status)) throw new Error('Status inválido');

    const [result] = await db.execute('UPDATE pedidos SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows > 0;
  }

  /**
   * Cancelar pedido — repõe o stock
   */
  static async cancelarPedido(id) {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const [itens] = await connection.execute(
        'SELECT produto_id, quantidade FROM itens_pedido WHERE pedido_id = ?',
        [id]
      );

      for (const item of itens) {
        await connection.execute(
          'UPDATE produtos SET stock = stock + ? WHERE id = ?',
          [item.quantidade, item.produto_id]
        );
      }

      await connection.execute(
        'UPDATE pedidos SET status = "cancelado" WHERE id = ?',
        [id]
      );

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Processar pagamento de pedido existente
   */
  static async processarPagamento(pedido_id, metodo_pagamento) {
    const [rows] = await db.execute('SELECT total FROM pedidos WHERE id = ?', [pedido_id]);
    if (rows.length === 0) throw new Error('Pedido não encontrado');

    const total = rows[0].total;
    const pagamento = await Pagamento.simularProcessamento(pedido_id, metodo_pagamento, total);

    await db.execute('UPDATE pedidos SET status = "pago" WHERE id = ?', [pedido_id]);
    return pagamento;
  }
}

module.exports = Pedido;
