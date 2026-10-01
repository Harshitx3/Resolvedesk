const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      res.status(401);
      return next(new Error('Not authorized, no user context'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error(
          `Forbidden: requires one of the following roles: ${allowedRoles.join(', ')}`
        )
      );
    }

    next();
  };
};

module.exports = authorizeRoles;
