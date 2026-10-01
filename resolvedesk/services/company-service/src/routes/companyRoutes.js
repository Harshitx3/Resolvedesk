const express = require('express');
const {
  createCompany,
  getCompanyById,
  getCompanyBySlug,
  updateCompany,
  updateCompanyStatus,
} = require('../controllers/companyController');
const {
  createCompanyValidation,
  updateCompanyValidation,
  updateStatusValidation,
  idParamValidation,
  slugParamValidation,
} = require('../services/validationService');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Public endpoint - no auth required. Used by the customer complaint portal.
router.get('/slug/:slug', slugParamValidation, getCompanyBySlug);

// Protected company management endpoints (future: require COMPANY_ADMIN role)
router.post(
  '/',
  authenticate,
  authorizeRoles('COMPANY_ADMIN', 'SUPER_ADMIN'),
  createCompanyValidation,
  createCompany
);

router.get(
  '/:id',
  authenticate,
  authorizeRoles('COMPANY_ADMIN', 'AGENT', 'SUPER_ADMIN'),
  idParamValidation,
  getCompanyById
);

router.patch(
  '/:id',
  authenticate,
  authorizeRoles('COMPANY_ADMIN', 'SUPER_ADMIN'),
  idParamValidation,
  updateCompanyValidation,
  updateCompany
);

router.patch(
  '/:id/status',
  authenticate,
  authorizeRoles('COMPANY_ADMIN', 'SUPER_ADMIN'),
  idParamValidation,
  updateStatusValidation,
  updateCompanyStatus
);

module.exports = router;
