import { Request, Response, NextFunction } from 'express';
import { Logger, InternalServerError } from '../utils';

/**
 * A middleware that handles the errors that may occurs in express routes callbacks.
 *
 * This middleware MUST come at the very end of express application middleware pipeline.
 * @param error The error object.
 * @param req The express request instance.
 * @param res The express response instance.
 * @param next The next middleware but actually this should be the last middleware in the pipeline, don't remove this parameter it's important.
 */
export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
  Logger.error(error.message, error);

  InternalServerError(res, error);
}
