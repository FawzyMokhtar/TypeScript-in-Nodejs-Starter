import { ValidationErrors } from './validation-errors.model';
import { PaginationInfo } from './pagination-info.model';

/**
 * Represents a data-access layer operation result.
 *
 * e.g. for create, search, find-by-id, update and delete operations.
 *
 * @template DataType The type of the expected resulting data from the operation.
 */
export interface DataResult<DataType> {
  /**
   * Gets or sets the data resulting from the operation.
   *
   * This property will has a value only if the operation was succeeded.
   */
  data?: DataType;

  /**
   * Gets or sets the pagination info if the operation was a succeeded set query operation.
   *
   * This property will has a value only if the operation was succeeded.
   */
  paginationInfo?: PaginationInfo;

  /**
   * Gets or sets the validation errors that preventing the operation from being proceeded.
   *
   * This property wont has value if the operation was succeeded.
   */
  validationErrors?: ValidationErrors;

  /**
   * Gets or sets an exception that may occurs during the processing of the operation.
   *
   * This property wont has value if the operation was succeeded.
   */
  error?: Error;
}
