import { v4 as uuid } from 'uuid';

/**
 * Use this function for create all errors,
 * this function extends the native Error class
 * @param {String} location Where error is throw
 * @param {Boolean} stack Set false for hide stacktrace
 * @param {Object} error Error log
 * return an Error object
  ```
  {
    id: 'uuid',
    name: 'Error name',
    location: 'Where error is throw',
    message: 'Error message',
    date: 'timestamp',
    stack: 'Error Stacktrace'
  }
  ```
 */
function AppError({ location, stack = true, error = {} }) {
  this.id = uuid(),
  this.name = error.name ?? null;
  this.location = location;
  this.message = error.message ?? null;
  this.date = new Date();
  Error.call(this);
  stack && Error.captureStackTrace(this);
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

export default AppError;

