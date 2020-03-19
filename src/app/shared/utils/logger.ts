import winston from 'winston';

/**
 * The logger service wrapper.
 */
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
      options: {
        createDirectory: true
      }
    }),
    new winston.transports.File({
      filename: 'logs/warnings.log',
      level: 'warning',
      options: {
        createDirectory: true
      }
    }),
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      options: {
        createDirectory: true
      }
    }),
    new winston.transports.Console({
      level: 'info'
    }),
    new winston.transports.Console({
      level: 'warning'
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
    const meta = { stack: error?.stack };
    logger.error(message, meta);
  }

  public static warn(message: string, warning: unknown): void {
    logger.warn(message, warning);
  }

  public static info(message: string, info: unknown): void {
    logger.info(message, info);
  }
}
