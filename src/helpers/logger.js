import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';
import AppError from './errors';

const { combine, printf } = format;

const errorFormat = printf(({ message: { location, error } }) => {
  const errorObject = new AppError({
    location,
    error,
  });
  const { id, date } = errorObject;

  console.error(chalk.redBright(`[ERROR] id: ${id} | location: ${location} | ${date}`));
  return JSON.stringify(errorObject);
});

const errorLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      level: 'error',
      filename: `${__dirname}/../logs/errors.log`,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false,
      format: combine(errorFormat),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: `${__dirname}/../logs/exceptions.log`,
    }),
  ],
});

const debugLogger = createLogger({
  handleExceptions: true,
  exitOnError: false,
  transports: [
    new transports.Console({
      level: 'debug',
      colorize: true,
      format: printf(info => chalk.magentaBright(`${JSON.stringify(info.message)}`)),
    }),
  ],
});

/**
 * Use this function for log all errors in the App.
 * this function show an colorized error message in console identified with uuidV4
 * and save complete error in JSON format in errors.log.
 * @param {String} location where error occurred
 * @param {Object} error error catched
 * @return {*}
 *
 * in console
 ```
 [ERROR] id: 'uuid' | location: 'sample controller' | ISO Date.
 ```
 * in errors.log
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
const error = ({ location, error }) => errorLogger.error({ location, error });

/**
 * Show colorized message for console.
 * @param {*} message
 * @return {*}
 */
const debug = (message) => debugLogger.debug(message);

export { error, debug };

errorLogger.on('finish', function(info) {
  console.error(chalk.red(`[ERROR] Error logger is stopped`));
  console.log(info);
});
errorLogger.on('error', function(err) {
  console.error(chalk.red(`[ERROR] An error occurred in Error logger`));
  console.log(err);
});

debugLogger.on('finish', function(info) {
  console.error(chalk.red(`[ERROR] Debug logger is stopped`));
  console.log(info);
});
debugLogger.on('error', function(err) {
  console.error(chalk.red(`[ERROR] An error occurred in Debug logger`));
  console.log(err);
});