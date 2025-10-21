// src/middleware/auth.js
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // agora o req.user.id e req.user.tipo ficam disponíveis
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
