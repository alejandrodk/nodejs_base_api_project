
/**
 * Use this function for log all errors
 * this function extends the native Error class
 * @param {String} description Error short description
 * @param {String} isOperational Set false if the error not affect the operation of the system
 * @param {Boolean} stack Set false for hide stacktrace
 * @param {Object} error Error log
 * @param {String} error.name Error name
 * @param {String} error.message Error message
 */
function AppError({ description, isOperational = true, stack = true, error }) {
  this.name = error.name ?? null;
  this.description = description;
  this.message = error.message ?? null;
  this.isOperational = isOperational;
  this.date = new Date();
  Error.call(this);
  stack && Error.captureStackTrace(this);
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

export default AppError;

