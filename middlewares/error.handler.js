function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler (err, req, res, next) {
  res.status(500).json({
    error: err.message,
    statusCode: 500
  })
}

function boomErrorHandler (err, req, res, next) {
  if(err.isBoom){
    const { output } = err;
    if(output.statusCode >= 500){
      res.status(500).json({
        error: 'error internal server',
        statusCode: 500
      })
    } else {
      res.status(output.statusCode).json(output.payload);
    }
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
