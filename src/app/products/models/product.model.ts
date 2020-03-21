import { Category } from '../../categories/models';

/**
 * Represents the products.
 */
export interface Product {
  /**
   * Gets or sets the id of the product.
   */
  id: number;

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

  /**
   * Gets or sets the category that the product belongs to.
   */
  category: Category;
}
