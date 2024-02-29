class ExpressError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = ExpressError;

/*
This Node.js code defines a 
custom error class ExpressError
that extends the built-in Error
class, allowing for custom status
codes and messages.*/
