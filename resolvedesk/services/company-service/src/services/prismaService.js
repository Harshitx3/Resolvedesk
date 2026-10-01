const { PrismaClient } = require('@prisma/client');

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prismaCompany) {
    global.prismaCompany = new PrismaClient();
  }
  prisma = global.prismaCompany;
}

module.exports = prisma;
