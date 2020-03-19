import { Category } from '../../categories/models';
import { Product } from '../../products/models';

/**
 * Represents a virtual database with two tables `categories` and `products`.
 */
export class Database {
  /**
   * Gets or sets the set of categories available in the database.
   */
  public categories: Category[] = [];

  /**
   * Gets or sets the set of products available in the database.
   */
  public products: Product[] = [];

  /**
   * Creates a new instance of @see Database and loads the database data.
   */
  public static async load(): Promise<Database> {
    return ((await import('../db/db.json')) as unknown) as Database;
  }
}
