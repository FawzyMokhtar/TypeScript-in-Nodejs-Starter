import winston from 'winston';

/**
 * The logger service wrapper.
 */
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      level: 'warn' /* error & warn logs will be logged to console. */
    }),
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error' /* only error logs will be logged to the file. */,
      options: {
        createDirectory: true /* Create directory and file if not exists. */,
        flags: 'a' /* `a` for append to the file, `w` for overwrite file on every app-start, default is `w`. */
      }
    }),
    new winston.transports.File({
      filename: 'logs/logs.log',
      level: 'info' /* error, warn, & info logs will be logged to the file. */,
      options: {
        createDirectory: true /* Create directory and file if not exists. */,
        flags: 'a' /* `a` for append to the file, `w` for overwrite file on every app-start, default is `w`. */
      }
    })
  ]
});

/**
 * A console only logger.
 */
const consoleLogger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      level: 'silly' /* error, warn, info, verbose, debug & silly logs will be logged to console. */
    })
  ]
});

/**
 * The logging service that includes functionalities to log any error, info or warnings.
 */
export class Logger {
  /**
   * Logs an error message and error stack to the logs `logs/errors.log` file.
   * @param message The error message to be logged.
   * @param error The Error object to log its stack if it was an exception.
   */
  public static error(message: string, error?: Error): void {
    const meta = { stack: error ? error.stack : '' };
    logger.error(message, meta);
  }

  /**
   * Logs a warning message to the logs `logs/logs.log` file.
   * @param message The warning message to be logged.
   * @param meta An optional additional warning data.
   */
  public static warn(message: string, meta?: unknown): void {
    logger.warn(message, meta);
  }

  /**
   * Logs a info message to the logs `logs/logs.log` file.
   * @param message The info message to be logged.
   * @param meta An optional additional info data.
   * @param logToConsole Makes sure if it safe to log this info to the console.
   * Could be used to keep sensitive data safe from being logged to the console.
   */
  public static info(message: string, meta?: unknown, logToConsole?: boolean): void {
    logger.info(message, meta);

    /* Make sure if it safe to log this info to the console. */
    if (logToConsole) {
      consoleLogger.info(message, meta);
    }
  }
}
