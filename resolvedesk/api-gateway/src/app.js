const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config/env');
const requestIdMiddleware = require('./middleware/requestId');
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const healthRoutes = require('./routes/healthRoutes');

const app = express();

app.set('env', config.nodeEnv);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestIdMiddleware);
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));

app.use('/api/v1/health', healthRoutes);

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    service: 'resolvedesk-api-gateway',
    version: 'v1',
    message: 'Welcome to ResolveDesk API Gateway',
    endpoints: {
      health: '/api/v1/health',
    },
  });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
