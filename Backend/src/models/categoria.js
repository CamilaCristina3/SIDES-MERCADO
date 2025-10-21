// backend/models/Categoria.js
const { query } = require('../config/database');
const slugify = require('slugify');

class Categoria {
  /**
   * Cria uma nova categoria com slug único
   */
  static async create(data) {
    const { nome, descricao, icone = 'fa-leaf', ordem_menu = 0 } = data;

    let slug = slugify(nome, { lower: true, strict: true });
    let finalSlug = slug;
    let counter = 1;

    // Garante slug único
    while (await Categoria.existsBySlug(finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const sql = `
      INSERT INTO categorias (nome, slug, descricao, icone, ordem_menu)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await query(sql, [nome, finalSlug, descricao, icone, ordem_menu]);
    return result.insertId;
  }

  /**
   * Verifica se slug já existe
   */
  static async existsBySlug(slug) {
    const rows = await query('SELECT id FROM categorias WHERE slug = ?', [slug]);
    return rows.length > 0;
  }

  /**
   * Busca categoria por slug
   */
  static async findBySlug(slug) {
    const rows = await query('SELECT * FROM categorias WHERE slug = ?', [slug]);
    return rows[0];
  }

  /**
   * Busca categoria por ID
   */
  static async findById(id) {
    const rows = await query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  }

  /**
   * Lista todas as categorias (ordenadas por menu)
   */
  static async findAll() {
    const rows = await query('SELECT * FROM categorias ORDER BY ordem_menu ASC, nome ASC');
    return rows;
  }

  /**
   * Atualiza categoria
   */
  static async update(id, updateData) {
    const allowedFields = ['nome', 'descricao', 'icone', 'ordem_menu'];
    const fieldsToUpdate = Object.keys(updateData).filter(f => allowedFields.includes(f));

    if (fieldsToUpdate.length === 0) {
      throw new Error('Nenhum campo válido para atualizar');
    }

    // Se nome for atualizado → atualizar também slug
    if (updateData.nome) {
      const slug = slugify(updateData.nome, { lower: true, strict: true });
      let finalSlug = slug;
      let counter = 1;

      while (await Categoria.existsBySlug(finalSlug)) {
        const existing = await Categoria.findBySlug(finalSlug);
        if (existing && existing.id !== Number(id)) {
          finalSlug = `${slug}-${counter}`;
          counter++;
        } else break;
      }

      updateData.slug = finalSlug;
      fieldsToUpdate.push('slug');
    }

    const setClause = fieldsToUpdate.map(f => `${f} = ?`).join(', ');
    const values = fieldsToUpdate.map(f => updateData[f]);
    values.push(id);

    const sql = `UPDATE categorias SET ${setClause} WHERE id = ?`;
    const result = await query(sql, values);

    return result.affectedRows > 0;
  }

  /**
   * Elimina uma categoria
   */
  static async delete(id) {
    const result = await query('DELETE FROM categorias WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Categoria;
