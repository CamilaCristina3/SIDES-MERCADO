const { query } = require('../config/database');

class Morada {
  static async listar(utilizador_id) {
    return query(
      `SELECT id, rotulo, morada, localidade, distrito, provincia, codigo_postal, principal
       FROM utilizador_moradas WHERE utilizador_id = ? ORDER BY principal DESC, id DESC`,
      [utilizador_id]
    );
  }

  static async criar(utilizador_id, data) {
    const { rotulo, morada, localidade, distrito, provincia, codigo_postal, principal = false } = data;
    if (principal) await query('UPDATE utilizador_moradas SET principal = 0 WHERE utilizador_id = ?', [utilizador_id]);
    const result = await query(
      `INSERT INTO utilizador_moradas (utilizador_id, rotulo, morada, localidade, distrito, provincia, codigo_postal, principal)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [utilizador_id, rotulo, morada, localidade, distrito, provincia, codigo_postal, principal ? 1 : 0]
    );
    return result.insertId;
  }

  static async atualizar(utilizador_id, id, data) {
    const allowed = ['rotulo', 'morada', 'localidade', 'distrito', 'provincia', 'codigo_postal', 'principal'];
    const fields = Object.keys(data).filter((f) => allowed.includes(f));
    if (fields.length === 0) return false;
    if (data.principal) await query('UPDATE utilizador_moradas SET principal = 0 WHERE utilizador_id = ?', [utilizador_id]);
    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (f === 'principal' ? (data[f] ? 1 : 0) : data[f]));
    values.push(utilizador_id, id);
    const sql = `UPDATE utilizador_moradas SET ${setClause} WHERE utilizador_id = ? AND id = ?`;
    const result = await query(sql, values);
    return result.affectedRows > 0;
  }

  static async remover(utilizador_id, id) {
    const result = await query('DELETE FROM utilizador_moradas WHERE utilizador_id = ? AND id = ?', [
      utilizador_id,
      id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = Morada;

