/**
 * Represents a validation error for the data-access layer.
 */
export class ValidationErrors {
  /**
   * Gets a key/value pair object,
   * where the key represents a property name
   * and the value is an array of string with all validation error messages for the current property.
   */
  private readonly errors: { [key: string]: string[] } = {};

  /**
   * Adds the given set of error messages to the corresponding property name.
   * @param property The name of the property as a string.
   * @param errorMessages The set of validation error messages.
   */
  public add(property: string, ...errorMessages: string[]): void {
    if (this.errors[property]) {
      this.errors[property].push(...errorMessages);
    } else {
      this.errors[property] = errorMessages;
    }
    return;
  }
}
