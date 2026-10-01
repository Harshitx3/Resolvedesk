// Auth middleware integration stub.
//
// Responsibility for actual JWT verification lives in the Auth Service and/or
// API Gateway. This file prepares a mounting point so protected routes can
// later require a valid user + COMPANY_ADMIN role without duplicating auth
// logic here.
//
// Expected future behavior (implemented in API Gateway or by calling Auth
// Service):
//   - Read Authorization: Bearer <token>
//   - Verify JWT (signature, expiry)
//   - Attach req.user = { id, role, companyId, ... }
//   - Reject 401 / 403 accordingly

const authenticate = async (req, res, next) => {
  // TODO: Integrate with Auth Service or expect API Gateway to have already
  // validated the token and injected req.user.
  //
  // For now, this is intentionally a passthrough stub so protected routes
  // keep the same shape as the future implementation. Remove the line below
  // once auth is wired up.
  return next();
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // If req.user was injected by a previous layer, validate the role.
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
    // Without a user (stub mode) we let requests through so endpoints can be
    // tested before auth integration.
    next();
  };
};

module.exports = {
  authenticate,
  authorizeRoles,
};
