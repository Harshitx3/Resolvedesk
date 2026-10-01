const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const response = {
    success: false,
    message: err.message,
    requestId: req.requestId || null,
  };

  if (req.app.get('env') === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandlerMiddleware;
