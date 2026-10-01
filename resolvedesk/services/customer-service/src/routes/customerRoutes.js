const express = require('express');
const {
  createCustomer,
  getCustomerById,
  getCustomerByEmail,
  updateCustomer,
} = require('../controllers/customerController');
const {
  createCustomerValidation,
  updateCustomerValidation,
  idParamValidation,
  byEmailValidation,
} = require('../services/validationService');
const { authenticate, authorizeRoles, requireCompanyScope } = require('../middleware/authMiddleware');

const router = express.Router();

// Guest-facing creation endpoint — will be called from API Gateway when the
// public complaint portal submits a ticket.
router.post('/', createCustomerValidation, createCustomer);

// Public-style lookup (will be internal/gateway-only in production)
router.get('/by-email', byEmailValidation, getCustomerByEmail);

// Protected routes: customers should only be viewed/edited by their owning
// company staff. Future: API Gateway injects req.user with companyId, and
// authorizeRoles + requireCompanyScope enforce tenant isolation.
router.get(
  '/:id',
  authenticate,
  authorizeRoles('COMPANY_ADMIN', 'AGENT', 'SUPER_ADMIN'),
  idParamValidation,
  getCustomerById
);

router.patch(
  '/:id',
  authenticate,
  authorizeRoles('COMPANY_ADMIN', 'AGENT', 'SUPER_ADMIN'),
  idParamValidation,
  updateCustomerValidation,
  updateCustomer
);

module.exports = router;
