const ContactMessage = require('../models/ContactMessage');
const logger = require('../monitoring/logger');

class ContactController {
  async enviar(req, res) {
    try {
      const { nome, email, assunto, mensagem } = req.body;
      if (!nome || !email || !mensagem) return res.status(400).json({ success: false, message: 'Campos obrigatórios' });
      const id = await ContactMessage.create({ nome, email, assunto: assunto || null, mensagem });
      res.status(201).json({ success: true, id });
    } catch (error) {
      logger.error('Erro ao enviar contacto', error);
      res.status(500).json({ success: false, message: 'Erro ao enviar contacto' });
    }
  }

  async listar(req, res) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const result = await ContactMessage.list({ page: parseInt(page), limit: parseInt(limit) });
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao listar mensagens' });
    }
  }
}

module.exports = new ContactController();

