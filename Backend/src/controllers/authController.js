const jwt = require('jsonwebtoken');
const Utilizador = require('../models/Utilizador');
const logger = require('../monitoring/logger');

function signToken(user) {
  const payload = { id: user.id, email: user.email, tipo: user.tipo };
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn });
}

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ success: false, message: 'Credenciais obrigatórias' });

      const user = await Utilizador.findByEmail(email);
      if (!user) return res.status(401).json({ success: false, message: 'Credenciais inválidas' });

      if (user.is_active === 0) return res.status(403).json({ success: false, message: 'Conta desativada' });

      const ok = await Utilizador.checkPassword(password, user.password);
      if (!ok) return res.status(401).json({ success: false, message: 'Credenciais inválidas' });

      const token = signToken(user);
      const { password: _, ...safeUser } = user;
      res.json({ success: true, token, user: safeUser });
    } catch (error) {
      logger.error('Erro no login', error);
      res.status(500).json({ success: false, message: 'Erro interno no login' });
    }
  }

  async changePassword(req, res) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) return res.status(400).json({ success: false, message: 'Dados inválidos' });

      if (newPassword.length < 8) return res.status(400).json({ success: false, message: 'Password fraca (mín. 8)' });

      const user = await Utilizador.findById(userId);
      const ok = await Utilizador.checkPassword(currentPassword, user.password);
      if (!ok) return res.status(401).json({ success: false, message: 'Password atual incorreta' });

      await Utilizador.updatePassword(userId, newPassword);
      res.json({ success: true, message: 'Password atualizada' });
    } catch (error) {
      logger.error('Erro ao alterar password', error);
      res.status(500).json({ success: false, message: 'Erro ao alterar password' });
    }
  }

  async logout(_req, res) {
    // Para JWT sem store server-side, logout é client-side (descartar token)
    res.json({ success: true, message: 'Sessão terminada' });
  }

  async forgotPassword(_req, res) {
    // Stub: integrar com serviço de email e token de recuperação
    res.json({ success: true, message: 'Se o email existir, enviaremos instruções' });
  }

  async resetPassword(_req, res) {
    // Stub: aceitar token de redefinição e nova password
    res.json({ success: true, message: 'Password redefinida (stub)' });
  }
}

module.exports = new AuthController();

