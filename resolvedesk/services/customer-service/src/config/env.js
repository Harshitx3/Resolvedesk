require('dotenv').config();

const config = {
  port: parseInt(process.env.PORT, 10) || 3005,
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = config;
