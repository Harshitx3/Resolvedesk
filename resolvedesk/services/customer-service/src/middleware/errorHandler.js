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

  if (req.app.get('env') === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandlerMiddleware;
