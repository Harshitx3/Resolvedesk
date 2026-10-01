const jwt = require('jsonwebtoken');
const config = require('../config/env');
const prisma = require('../services/prismaService');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401);
      return next(new Error('Not authorized, no token provided'));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401);
      return next(new Error('Not authorized, token missing'));
    }

    const decoded = jwt.verify(token, config.jwt.secret);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
      },
    });

    if (!user) {
      res.status(401);
      return next(new Error('Not authorized, user not found'));
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    if (error.name === 'TokenExpiredError') {
      return next(new Error('Not authorized, token expired'));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(new Error('Not authorized, invalid token'));
    }
    return next(new Error('Not authorized, token verification failed'));
  }
};

module.exports = authenticate;
