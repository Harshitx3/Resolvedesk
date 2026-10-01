const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config/env');
const requestIdMiddleware = require('./middleware/requestId');
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const healthRoutes = require('./routes/healthRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();

app.set('env', config.nodeEnv);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestIdMiddleware);
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));

app.use('/health', healthRoutes);
app.use('/customers', customerRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    service: 'resolvedesk-customer-service',
    version: 'v1',
    message: 'ResolveDesk Guest Customer Service (no customer auth)',
    endpoints: {
      health: '/health',
      createCustomer: 'POST /customers',
      getCustomer: 'GET /customers/:id',
      getCustomerByEmail: 'GET /customers/by-email?companyId=X&email=Y',
      updateCustomer: 'PATCH /customers/:id',
    },
  });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
