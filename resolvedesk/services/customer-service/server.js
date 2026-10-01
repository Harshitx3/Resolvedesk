const app = require('./src/app');
const config = require('./src/config/env');
const prisma = require('./src/services/prismaService');

const server = app.listen(config.port, async () => {
  try {
    await prisma.$connect();
    console.log(`
==========================================
  ResolveDesk Customer Service
==========================================
  Port:        ${config.port}
  Environment: ${config.nodeEnv}
  Health:      http://localhost:${config.port}/health
  Database:    Connected ✓
==========================================
  `);
  } catch (err) {
    console.error('Failed to connect to the database:', err.message);
    console.log(`
==========================================
  ResolveDesk Customer Service
==========================================
  Port:        ${config.port}
  Environment: ${config.nodeEnv}
  Health:      http://localhost:${config.port}/health
  Database:    ⚠️  Not connected (check DATABASE_URL)
==========================================
  `);
  }
});

const shutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  await prisma.$disconnect();
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
