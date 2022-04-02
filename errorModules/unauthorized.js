const ERROR_UNAUTHORISED = 401;

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORISED;
  }
}

module.exports = UnauthorizedError;
