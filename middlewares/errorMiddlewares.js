const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV !== "production") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors || err,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
};

module.exports = globalError;
