const bcrypt = require('bcryptjs');
const config = require('../config/env');

const hashPassword = async (plainTextPassword) => {
  const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);
  return bcrypt.hash(plainTextPassword, salt);
};

const comparePasswords = async (plainTextPassword, hashedPassword) => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePasswords,
};
