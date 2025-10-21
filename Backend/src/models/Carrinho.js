// backend/models/Carrinho.js
const { query } = require('../config/database');

class Carrinho {
  /**
   * Encontra ou cria o carrinho de um utilizador
   */
  static async findOrCreateByUtilizadorId(utilizadorId) {
    const rows = await query('SELECT * FROM carrinhos WHERE utilizador_id = ?', [utilizadorId]);

    if (rows.length > 0) return rows[0];

    const result = await query('INSERT INTO carrinhos (utilizador_id) VALUES (?)', [utilizadorId]);
    return { id: result.insertId, utilizador_id: utilizadorId };
  }

  /**
   * Adiciona um item ao carrinho
   */
  static async adicionarItem(utilizadorId, itemData) {
    const { produtoId, quantidade, preco, unidade = 'un' } = itemData;

    const carrinho = await this.findOrCreateByUtilizadorId(utilizadorId);

    // Verifica se o item já existe no carrinho
    const existing = await query(
      'SELECT * FROM itens_carrinho WHERE carrinho_id = ? AND produto_id = ?',
      [carrinho.id, produtoId]
    );

    if (existing.length > 0) {
      const novoTotal = existing[0].quantidade + quantidade;
      await query(
        'UPDATE itens_carrinho SET quantidade = ?, preco = ? WHERE id = ?',
        [novoTotal, preco, existing[0].id]
      );
      return { ...existing[0], quantidade: novoTotal, preco: parseFloat(preco) };
    } else {
      const result = await query(
        'INSERT INTO itens_carrinho (carrinho_id, produto_id, quantidade, preco, unidade) VALUES (?, ?, ?, ?, ?)',
        [carrinho.id, produtoId, quantidade, preco, unidade]
      );
      return {
        id: result.insertId,
        carrinho_id: carrinho.id,
        produto_id: produtoId,
        quantidade,
        preco: parseFloat(preco),
        unidade
      };
    }
  }

  /**
   * Obtém o carrinho completo (com itens e subtotal)
   */
  static async findByUtilizadorId(utilizadorId) {
    const carrinhos = await query('SELECT * FROM carrinhos WHERE utilizador_id = ?', [utilizadorId]);
    if (carrinhos.length === 0) return { itens: [] };

    const carrinho = carrinhos[0];
    const itens = await query(
      `
      SELECT ic.*, p.nome, p.slug, p.imagem, p.disponivel, p.stock
      FROM itens_carrinho ic
      JOIN produtos p ON ic.produto_id = p.id
      WHERE ic.carrinho_id = ?
      `,
      [carrinho.id]
    );

    const itensFormatados = itens.map((item) => ({
      ...item,
      preco: parseFloat(item.preco),
      subtotal: parseFloat(item.preco) * item.quantidade,
      moeda: 'MZN'
    }));

    const total = itensFormatados.reduce((sum, i) => sum + i.subtotal, 0);

    return {
      ...carrinho,
      moeda: 'MZN',
      total,
      itens: itensFormatados
    };
  }

  /**
   * Remove um item do carrinho
   */
  static async removerItem(utilizadorId, itemId) {
    const carrinhos = await query('SELECT * FROM carrinhos WHERE utilizador_id = ?', [utilizadorId]);
    if (carrinhos.length === 0) return false;

    const carrinho = carrinhos[0];
    const result = await query('DELETE FROM itens_carrinho WHERE id = ? AND carrinho_id = ?', [
      itemId,
      carrinho.id
    ]);
    return result.affectedRows > 0;
  }

  /**
   * Atualiza a quantidade de um item
   */
  static async atualizarQuantidade(utilizadorId, itemId, quantidade) {
    if (quantidade < 1) {
      return await this.removerItem(utilizadorId, itemId);
    }

    const carrinhos = await query('SELECT * FROM carrinhos WHERE utilizador_id = ?', [utilizadorId]);
    if (carrinhos.length === 0) return false;

    const carrinho = carrinhos[0];
    const result = await query(
      'UPDATE itens_carrinho SET quantidade = ? WHERE id = ? AND carrinho_id = ?',
      [quantidade, itemId, carrinho.id]
    );

    return result.affectedRows > 0;
  }

  /**
   * Limpa todos os itens do carrinho
   */
  static async limparCarrinho(utilizadorId) {
    const carrinhos = await query('SELECT * FROM carrinhos WHERE utilizador_id = ?', [utilizadorId]);
    if (carrinhos.length === 0) return false;

    const carrinho = carrinhos[0];
    const result = await query('DELETE FROM itens_carrinho WHERE carrinho_id = ?', [carrinho.id]);
    return result.affectedRows > 0;
  }
}

module.exports = Carrinho;
