const ERROR_CONFLICT = 404;

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CONFLICT;
  }
}

module.exports = ConflictError;
