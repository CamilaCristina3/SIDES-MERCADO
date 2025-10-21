const { query } = require('../config/database');

class Favorito {
  static async listar(utilizador_id) {
    const sql = `
      SELECT f.id, f.utilizador_id, f.produto_id, p.nome, p.slug, p.preco, p.imagem
      FROM favoritos f
      JOIN produtos p ON p.id = f.produto_id
      WHERE f.utilizador_id = ?
      ORDER BY f.id DESC
    `;
    return query(sql, [utilizador_id]).then((rows) => rows.map((r) => ({ ...r, preco: parseFloat(r.preco) })));
  }

  static async adicionar(utilizador_id, produto_id) {
    const exists = await query('SELECT id FROM favoritos WHERE utilizador_id = ? AND produto_id = ?', [
      utilizador_id,
      produto_id,
    ]);
    if (exists.length) return exists[0].id;
    const result = await query('INSERT INTO favoritos (utilizador_id, produto_id) VALUES (?, ?)', [
      utilizador_id,
      produto_id,
    ]);
    return result.insertId;
  }

  static async remover(utilizador_id, produto_id) {
    const result = await query('DELETE FROM favoritos WHERE utilizador_id = ? AND produto_id = ?', [
      utilizador_id,
      produto_id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = Favorito;

