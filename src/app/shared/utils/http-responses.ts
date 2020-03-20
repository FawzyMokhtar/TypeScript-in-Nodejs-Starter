import { Response } from 'express';
import { AppHttpResponse, AppErrorCode } from '../models';

/**
 * Returns a succeeded response with 200 status code.
 * @param response The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
export function Ok(response: Response, body?: AppHttpResponse): Response {
  return body ? response.send(body) : response.send();
}

/**
 * Returns a bad-request response with 200 status code.
 * @param response The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
export function BadRequest(response: Response, body?: AppHttpResponse): Response {
  return body ? response.status(400).send(body) : response.status(400).send();
}

/**
 * Returns an un-authenticated response with 401 status code.
 * @param response The http-response to be modified.
 */
export function UnAuthenticated(response: Response): Response {
  const body: AppHttpResponse = {
    errors: [
      {
        code: AppErrorCode.UnAuthenticated,
        title: 'User is not authenticated',
        detail: 'No valid access token provided'
      }
    ]
  };

  return response.status(401).send(body);
}

/**
 * Returns a forbidden response with 403 status code.
 * @param response The http-response to be modified.
 */
export function Forbidden(response: Response): Response {
  const body: AppHttpResponse = {
    errors: [
      {
        code: AppErrorCode.Forbidden,
        title: 'Access denied',
        detail: `The user is trying to access a resource that he doesn't has the right to access`
      }
    ]
  };

  return response.status(403).send(body);
}

/**
 * Returns a notfound response with 404 status code.
 * @param response The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
export function NotFound(response: Response, body?: AppHttpResponse): Response {
  return body ? response.status(404).send(body) : response.status(404).send();
}

/**
 * Returns an internal server error response with 500 status code.
 * @param response The http-response to be modified.
 * @param error The error or error-message to be sent within the response' body.
 */
export function InternalServerError(response: Response, error: string | Error): Response {
  const body: AppHttpResponse = {
    errors: [
      {
        code: AppErrorCode.InternalServerError,
        title: 'Internal server error',
        detail: typeof error === 'string' ? error : error.message
      }
    ]
  };
  return response.status(500).send(body);
}
