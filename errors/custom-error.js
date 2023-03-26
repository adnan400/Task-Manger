class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, stsCode) => {
  return new CustomApiError(msg, stsCode);
};

module.exports = { CustomApiError, createCustomError };
