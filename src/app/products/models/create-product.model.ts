/**
 * Represents a product create request data-model.
 */
export interface CreateProductInput {
  /**
   * Gets or sets the name of product.
   */
  name: string;

  /**
   * Gets or sets the price of the product.
   */
  price: number;

  /**
   * Gets or sets the id of the category that the product belongs to.
   */
  categoryId: number;
}
