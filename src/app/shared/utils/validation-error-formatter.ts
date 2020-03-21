import { ValidationError } from 'express-validator';
import { AppHttpResponseError } from '../models';

/**
 * Formats a given express-validator validation-error in an `AppHttpResponseError` form.
 * @param expressValidatorError The express-validator validation-error.
 */
export function validationErrorFormatter(expressValidatorError: ValidationError): AppHttpResponseError {
  /* Create a new app-error from express-validation-error payload's message field. */
  const appErr: AppHttpResponseError = expressValidatorError.msg ? expressValidatorError.msg : {};

  /* Set the name of the field that causes the error. */
  appErr.source = expressValidatorError.param;

  return appErr;
}
