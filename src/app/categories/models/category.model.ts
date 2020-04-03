/**
 * Represents a data transfer object(DTO) for the products category.
 *
 * @see for more information about DTO https://www.codeproject.com/Articles/1050468/Data-Transfer-Object-Design-Pattern-in-Csharp
 */
export interface CategoryDTO {
  /**
   * Gets or sets the id of the category.
   */
  id: string;

  /**
   * Gets or sets the name of category.
   */
  name: string;
}
