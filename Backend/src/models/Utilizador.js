// backend/models/Utilizador.js
const { query } = require('../config/database');
const bcrypt = require('bcryptjs');

class Utilizador {
  /**
   * Cria um novo utilizador.
   */
  static async create(userData) {
    const {
      email,
      password,
      first_name,
      last_name,
      tipo = 'C',
      telefone,
      nif,
      morada,
      provincia,
      distrito,
      codigo_postal,
      localidade,
      imagem_perfil
    } = userData;

    const hashedPassword = await bcrypt.hash(password, 12);

    const sql = `
      INSERT INTO utilizadores
        (email, password, first_name, last_name, tipo, telefone, nif,
         morada, provincia, distrito, codigo_postal, localidade, imagem_perfil)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      email,
      hashedPassword,
      first_name,
      last_name,
      tipo,
      telefone,
      nif,
      morada,
      provincia,
      distrito,
      codigo_postal,
      localidade,
      imagem_perfil
    ]);

    return result.insertId;
  }

  /**
   * Encontra utilizador por email.
   */
  static async findByEmail(email) {
    const rows = await query('SELECT * FROM utilizadores WHERE email = ?', [email]);
    return rows[0];
  }

  /**
   * Encontra utilizador por ID.
   */
  static async findById(id) {
    const rows = await query('SELECT * FROM utilizadores WHERE id = ?', [id]);
    return rows[0];
  }

  /**
   * Encontra utilizador por NIF.
   */
  static async findByNif(nif) {
    const rows = await query('SELECT * FROM utilizadores WHERE nif = ?', [nif]);
    return rows[0];
  }

  /**
   * Atualiza campos permitidos.
   */
  static async update(id, updateData) {
    const allowedFields = [
      'first_name',
      'last_name',
      'telefone',
      'morada',
      'provincia',
      'distrito',
      'codigo_postal',
      'localidade',
      'imagem_perfil'
    ];

    const fields = Object.keys(updateData).filter(f => allowedFields.includes(f));
    if (fields.length === 0) {
      throw new Error('Nenhum campo válido para atualizar');
    }

    const setClause = fields.map(f => `${f} = ?`).join(', ');
    const values = fields.map(f => updateData[f]);
    values.push(id);

    const sql = `UPDATE utilizadores SET ${setClause} WHERE id = ?`;
    const result = await query(sql, values);
    return result.affectedRows > 0;
  }

  /**
   * Atualiza senha.
   */
  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const result = await query('UPDATE utilizadores SET password = ? WHERE id = ?', [
      hashedPassword,
      id
    ]);
    return result.affectedRows > 0;
  }

  /**
   * Listagem paginada e filtrada.
   */
  static async findAllPaginated(filters = {}, options = { page: 1, limit: 10 }) {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    let where = 'WHERE 1=1';
    const params = [];

    if (filters.tipo) {
      where += ' AND tipo = ?';
      params.push(filters.tipo);
    }

    if (filters.search) {
      where += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)';
      const term = `%${filters.search}%`;
      params.push(term, term, term);
    }

    const [{ total }] = await query(`SELECT COUNT(*) AS total FROM utilizadores ${where}`, params);

    const sql = `
      SELECT id, email, first_name, last_name, tipo, telefone, nif, morada,
             provincia, distrito, codigo_postal, localidade, imagem_perfil,
             data_registo, date_joined, is_active
      FROM utilizadores
      ${where}
      ORDER BY data_registo DESC
      LIMIT ? OFFSET ?
    `;
    const rows = await query(sql, [...params, limit, offset]);

    return {
      users: rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Verifica senha.
   */
  static async checkPassword(plain, hashed) {
    return await bcrypt.compare(plain, hashed);
  }

  /**
   * Helpers para tipo de utilizador.
   */
  static isProdutor(tipo) {
    return tipo === 'P';
  }
  static isConsumidor(tipo) {
    return tipo === 'C';
  }
}

module.exports = Utilizador;
