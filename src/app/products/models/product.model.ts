import { CategoryDTO } from '../../categories/models';

/**
 * Represents a data transfer object(DTO) for the product.
 *
 * @see for more information about DTO https://www.codeproject.com/Articles/1050468/Data-Transfer-Object-Design-Pattern-in-Csharp
 */
export interface ProductDTO {
  /**
   * Gets or sets the id of the product.
   */
  id: string;

  /**
   * Gets or sets the name of product.
   */
  name: string;

  /**
   * Gets or sets the price of the product.
   */
  price: number;

  /**
   * Gets or sets the id of the category or the category itself that the product belongs to.
   */
  category: string | CategoryDTO;
}
