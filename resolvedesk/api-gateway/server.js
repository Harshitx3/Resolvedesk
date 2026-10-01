const app = require('./src/app');
const config = require('./src/config/env');

const server = app.listen(config.port, () => {
  console.log(`
==========================================
  ResolveDesk API Gateway
==========================================
  Port:      ${config.port}
  Environment: ${config.nodeEnv}
  Health:    http://localhost:${config.port}/api/v1/health
==========================================
  `);
});

const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
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
