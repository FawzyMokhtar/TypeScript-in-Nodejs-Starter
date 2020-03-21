/**
 * The application-specific error codes.
 */
export enum AppErrorCode {
  /** Un-authenticated code. */
  UnAuthenticated = 1,

  /** Access denied or forbidden code. */
  Forbidden = 2,

  /** Internal server code. */
  InternalServerError = 3,

  /** The field is required code. */
  IsRequired = 4,

  /** The field type is invalid. */
  InvalidType = 5,

  /** The field type is String and its length is invalid. */
  InvalidLength = 6,

  /** The entity field value already exists in another entity. */
  ValueExists = 7,

  /** The entity can't be deleted due to its existing relations with other entities. */
  CantBeDeleted = 8
}
