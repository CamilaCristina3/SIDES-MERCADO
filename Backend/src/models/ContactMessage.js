const { query } = require('../config/database');

class ContactMessage {
  static async create({ nome, email, assunto, mensagem }) {
    const result = await query(
      'INSERT INTO contact_messages (nome, email, assunto, mensagem) VALUES (?, ?, ?, ?)',
      [nome, email, assunto, mensagem]
    );
    return result.insertId;
  }

  static async list({ page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;
    const [{ total }] = await query('SELECT COUNT(*) AS total FROM contact_messages');
    const rows = await query(
      'SELECT id, nome, email, assunto, mensagem, created_at FROM contact_messages ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return { messages: rows, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } };
  }
}

module.exports = ContactMessage;

