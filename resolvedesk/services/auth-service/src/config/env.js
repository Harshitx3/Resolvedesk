require('dotenv').config();

const config = {
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  bcrypt: {
    saltRounds: 12,
  },
  roles: {
    SUPER_ADMIN: 'SUPER_ADMIN',
    COMPANY_ADMIN: 'COMPANY_ADMIN',
    AGENT: 'AGENT',
  },
  publicRegistrableRoles: ['COMPANY_ADMIN', 'AGENT'],
};

module.exports = config;
