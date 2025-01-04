class ApiError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;
  }
}

module.exports = ApiError;
