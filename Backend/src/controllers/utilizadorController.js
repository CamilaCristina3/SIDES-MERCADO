// src/controllers/utilizadorController.js
const Utilizador = require('../models/Utilizador');
const logger = require('../monitoring/logger');

class UtilizadorController {
  /**
   * Registar novo utilizador
   */
  async register(req, res) {
    try {
      const { email, password, first_name, last_name, tipo, telefone, nif, morada, codigo_postal, localidade, provincia, distrito } = req.body;

      // Verifica se o utilizador já existe
      const existing = await Utilizador.findByEmail(email);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Este email já está registado.'
        });
      }

      const id = await Utilizador.create({
        email,
        password,
        first_name,
        last_name,
        tipo,
        telefone,
        nif,
        morada,
        codigo_postal,
        localidade,
        provincia,
        distrito
      });

      logger.info('Novo utilizador registado', { id, email });

      res.status(201).json({
        success: true,
        message: 'Utilizador criado com sucesso',
        data: { id, email }
      });

    } catch (error) {
      logger.error('Erro ao criar utilizador', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno ao criar utilizador'
      });
    }
  }

  /**
   * Listar utilizadores (apenas administradores)
   */
  async listar(req, res) {
    try {
      const { page = 1, limit = 10, tipo, search } = req.query;

      const result = await Utilizador.findAllPaginated(
        { tipo, search },
        { page: parseInt(page), limit: parseInt(limit) }
      );

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error('Erro ao listar utilizadores', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao listar utilizadores'
      });
    }
  }

  /**
   * Ver perfil do utilizador logado
   */
  async perfil(req, res) {
    try {
      const userId = req.user.id;
      const user = await Utilizador.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilizador não encontrado'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Erro ao obter perfil', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao obter perfil do utilizador'
      });
    }
  }

  /**
   * Atualizar dados do utilizador
   */
  async atualizar(req, res) {
    try {
      const userId = req.user.id;
      const updateData = req.body;

      const updated = await Utilizador.update(userId, updateData);

      if (!updated) {
        return res.status(400).json({
          success: false,
          message: 'Nada foi atualizado'
        });
      }

      logger.info('Utilizador atualizado', { userId });

      res.json({
        success: true,
        message: 'Dados atualizados com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao atualizar utilizador', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar dados do utilizador'
      });
    }
  }
}

module.exports = new UtilizadorController();
