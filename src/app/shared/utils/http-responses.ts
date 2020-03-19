import { Response } from 'express';
import { AppHttpResponse, AppErrorCode } from '../models';

/**
 * Returns a succeeded response with 200 status code.
 * @param res The http-response to be modified.
 * @param body The body that will be sent within the response' body.
 */
export function OK(res: Response, body: AppHttpResponse): Response {
  return body ? res.send(body) : res.send();
}

/**
 * Returns a bad-request response with 200 status code.
 * @param res The http-response to be modified.
 * @param body The body that will be sent within the response' body.
 */
export function BadRequest(res: Response, body: AppHttpResponse): Response {
  return body ? res.status(400).send(body) : res.status(400).send();
}

/**
 * Returns an un-authenticated response with 401 status code.
 * @param res The http-response to be modified.
 */
export function UnAuthenticated(res: Response): Response {
  const body: AppHttpResponse = {
    errors: [
      {
        code: AppErrorCode.UnAuthenticated,
        title: 'User is not authenticated',
        detail: 'No valid access token provided'
      }
    ]
  };

  return res.status(401).send(body);
}

/**
 * Returns a forbidden response with 403 status code.
 * @param res The http-response to be modified.
 */
export function Forbidden(res: Response): Response {
  const body: AppHttpResponse = {
    errors: [
      {
        code: AppErrorCode.Forbidden,
        title: 'Access denied',
        detail: `The user is trying to access a resource that he doesn't has the right to access`
      }
    ]
  };

  return res.status(403).send(body);
}

/**
 * Returns an internal server error response with 500 status code.
 * @param res The http-response to be modified.
 * @param error The error or error-message to be sent within the response' body.
 */
export function InternalServerError(res: Response, error: string | Error): Response {
  const body: AppHttpResponse = {
    errors: [
      {
        code: AppErrorCode.InternalServerError,
        title: 'Internal server error',
        detail: typeof error === 'string' ? error : error?.message
      }
    ]
  };

  return res.status(500).send(body);
}
