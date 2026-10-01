const { PrismaClient } = require('@prisma/client');

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prismaCustomer) {
    global.prismaCustomer = new PrismaClient();
  }
  prisma = global.prismaCustomer;
}

module.exports = prisma;
