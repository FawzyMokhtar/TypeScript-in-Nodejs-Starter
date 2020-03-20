import { Logger } from '..';

/**
 * Handles any unhandled exception and take the suitable action against it.
 *
 * This function MUST be called at the very beginning of node.js application startup.
 */
export function unhandledExceptionAndRejectionHandler(): void {
  // Log uncaught Exceptions
  process.on('uncaughtException', (error: Error) => {
    error.message = `GOT AN UNCAUGHT EXCEPTION => ${error.message}`;
    Logger.error(error.message, error);
  });

  // Log unhandled Rejection
  process.on('unhandledRejection', error => {
    if (error instanceof Error) {
      error.message = `GOT AN UNCAUGHT EXCEPTION => ${error.message}`;
      Logger.error(error.message, error);
    } else {
      Logger.error(`GOT AN UNCAUGHT EXCEPTION => ${error}`);
    }
  });
}
