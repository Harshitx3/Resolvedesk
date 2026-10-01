const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
    requestId: req.requestId || null,
  };

  if (err.array && typeof err.array === 'function') {
    response.errors = err.array();
  }

  if (err.code && String(err.code).startsWith('P2')) {
    response.message = handlePrismaError(err);
  }

  if (req.app.get('env') === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

const handlePrismaError = (err) => {
  switch (err.code) {
    case 'P2002':
      const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'field';
      return `Duplicate entry: A record with this ${target} already exists`;
    case 'P2003':
      return 'Foreign key constraint failed';
    case 'P2025':
      return 'Record not found';
    default:
      return 'A database error occurred';
  }
};

module.exports = errorHandlerMiddleware;
