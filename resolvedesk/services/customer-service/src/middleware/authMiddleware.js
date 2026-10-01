// Auth integration stub for Customer Service.
//
// Customers are GUESTS — there is NO customer login/registration.
// This file exists so that protected, company-facing endpoints later
// (e.g. listing a company's customers) can require a valid COMPANY_ADMIN /
// AGENT JWT without duplicating JWT verification logic here.
//
// The actual JWT verification belongs to the Auth Service and/or the API
// Gateway that sits in front of this service.
//
// Once integrated, protected customer endpoints should:
//   1. Verify a valid Bearer token (handled by gateway / authenticate)
//   2. Scope ALL reads/writes by req.user.companyId for tenant isolation

const authenticate = async (req, res, next) => {
  // TODO: Validate JWT via API Gateway or by calling Auth Service.
  // Expected future injection: req.user = { id, role, companyId }.
  // For now this is a stub passthrough so endpoints can be tested standalone.
  return next();
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (req.user && req.user.role) {
      if (!allowedRoles.includes(req.user.role)) {
        res.status(403);
        return next(
          new Error(
            `Forbidden: requires one of the following roles: ${allowedRoles.join(', ')}`
          )
        );
      }
    }
    next();
  };
};

// Tenant scoping guard (to be used on every company-admin-accessible customer
// endpoint). Ensures that, once req.user is injected, all customer reads /
// writes are restricted to the caller's company.
const requireCompanyScope = (companyIdFromBodyOrParam) => (req, res, next) => {
  if (req.user && req.user.companyId) {
    if (companyIdFromBodyOrParam && companyIdFromBodyOrParam !== req.user.companyId) {
      res.status(403);
      return next(new Error('Forbidden: tenant mismatch'));
    }
  }
  next();
};

module.exports = {
  authenticate,
  authorizeRoles,
  requireCompanyScope,
};
