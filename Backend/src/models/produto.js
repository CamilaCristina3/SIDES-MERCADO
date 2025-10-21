// backend/models/Produto.js
const { query } = require('../config/database');
const slugify = require('slugify');

class Produto {
  /**
   * Cria um novo produto
   */
  static async create(produtoData) {
    const {
      nome,
      descricao,
      preco,
      unidade = 'un',
      stock = 0,
      imagem = null,
      categoria_id = null,
      produtor_id,
      data_colheita = null,
      certificado_biologico = false,
      disponivel = true,
      destaque = false
    } = produtoData;

    const slug = await this.generateSlug(nome);

    const sql = `
      INSERT INTO produtos
        (nome, slug, descricao, preco, unidade, stock, imagem,
         categoria_id, produtor_id, data_colheita,
         certificado_biologico, disponivel, destaque)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      nome,
      slug,
      descricao,
      preco,
      unidade,
      stock,
      imagem,
      categoria_id,
      produtor_id,
      data_colheita,
      certificado_biologico,
      disponivel,
      destaque
    ]);

    return result.insertId;
  }

  /**
   * Gera slug único baseado no nome
   */
  static async generateSlug(nome) {
    const nomeNormalizado = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const baseSlug = slugify(nomeNormalizado, { lower: true, strict: true });

    let slug = baseSlug;
    let counter = 1;

    while (await this.findBySlug(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  static async findBySlug(slug) {
    const rows = await query('SELECT * FROM produtos WHERE slug = ?', [slug]);
    return rows[0];
  }

  static async findById(id) {
    const rows = await query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
  }

  /**
   * Lista produtos com filtros e paginação
   */
  static async findAllPaginated(
    filters = {},
    options = { page: 1, limit: 12, orderBy: 'data_criacao', order: 'DESC' }
  ) {
    const { page, limit, orderBy, order } = options;
    const offset = (page - 1) * limit;

    let where = 'WHERE 1=1';
    const params = [];

    if (filters.categoria_id) {
      where += ' AND p.categoria_id = ?';
      params.push(filters.categoria_id);
    }

    if (filters.disponivel !== undefined) {
      where += ' AND p.disponivel = ?';
      params.push(filters.disponivel);
    }

    if (filters.destaque !== undefined) {
      where += ' AND p.destaque = ?';
      params.push(filters.destaque);
    }

    if (filters.preco_min) {
      where += ' AND p.preco >= ?';
      params.push(parseFloat(filters.preco_min));
    }

    if (filters.preco_max) {
      where += ' AND p.preco <= ?';
      params.push(parseFloat(filters.preco_max));
    }

    if (filters.search) {
      where += ' AND (p.nome LIKE ? OR p.descricao LIKE ?)';
      const term = `%${filters.search}%`;
      params.push(term, term);
    }

    if (filters.produtor_id) {
      where += ' AND p.produtor_id = ?';
      params.push(filters.produtor_id);
    }

    // Total de resultados
    const [{ total }] = await query(`SELECT COUNT(*) AS total FROM produtos p ${where}`, params);

    // Colunas válidas para ordenação
    const validOrderColumns = ['nome', 'preco', 'data_criacao', 'destaque'];
    const orderColumn = validOrderColumns.includes(orderBy) ? orderBy : 'data_criacao';
    const orderDirection = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Consulta principal com joins
    const sql = `
      SELECT 
        p.*, 
        c.nome AS categoria_nome,
        u.first_name AS produtor_nome,
        u.localidade AS produtor_localidade,
        u.provincia AS produtor_provincia
      FROM produtos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN utilizadores u ON p.produtor_id = u.id
      ${where}
      ORDER BY p.${orderColumn} ${orderDirection}
      LIMIT ? OFFSET ?
    `;

    const rows = await query(sql, [...params, limit, offset]);

    // Conversão segura do preço (DECIMAL → float)
    const formatted = rows.map((r) => ({
      ...r,
      preco: parseFloat(r.preco)
    }));

    return {
      products: formatted,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Produtos em destaque
   */
  static async findFeatured(limit = 8) {
    const sql = `
      SELECT p.*, c.nome AS categoria_nome, u.first_name AS produtor_nome
      FROM produtos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN utilizadores u ON p.produtor_id = u.id
      WHERE p.destaque = TRUE AND p.disponivel = TRUE
      ORDER BY p.data_criacao DESC
      LIMIT ?
    `;
    const rows = await query(sql, [limit]);
    return rows.map((r) => ({ ...r, preco: parseFloat(r.preco) }));
  }

  /**
   * Atualiza produto
   */
  static async update(id, updateData) {
    const allowedFields = [
      'nome',
      'descricao',
      'preco',
      'unidade',
      'stock',
      'imagem',
      'categoria_id',
      'data_colheita',
      'certificado_biologico',
      'disponivel',
      'destaque'
    ];

    const fields = Object.keys(updateData).filter((f) => allowedFields.includes(f));
    if (fields.length === 0) {
      throw new Error('Nenhum campo válido para atualizar');
    }

    // Se o nome for atualizado, regenerar o slug
    if (updateData.nome) {
      updateData.slug = await this.generateSlug(updateData.nome);
      fields.push('slug');
    }

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => updateData[f]);
    values.push(id);

    const sql = `UPDATE produtos SET ${setClause} WHERE id = ?`;
    const result = await query(sql, values);

    return result.affectedRows > 0;
  }

  /**
   * Elimina produto
   */
  static async delete(id) {
    const result = await query('DELETE FROM produtos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Produto;
