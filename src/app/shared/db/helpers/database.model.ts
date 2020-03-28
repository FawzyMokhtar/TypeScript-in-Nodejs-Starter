import { Sequelize } from 'sequelize';
import { Category, Product } from '../models';

/* 
   Connect to database.
   NOTE: i'm connecting here to the database `typescript_in_nodejs_starter_db` on my `localhost` with username `postgres` and password 'fawzy'.
   You can change this data and use your data instead.
 */

/**
 * A singleton instance of sequelize that will be used across the application.
 *
 * @summary It's important to not use any other instances of sequelize other than this instance unless you have more than one database.
 */
const sequelize = new Sequelize('typescript_in_nodejs_starter_db', 'postgres', 'fawzy', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false /* Stop logging sql queries unless your are tracing some problems. */
});

/**
 * The Database helper that includes all functionalities related to the database and all of it's models.
 * @summary All of this class members are static.
 * @summary All database models should be registered in this class.
 * @summary All database models should be accessed only through this class as central point of database functionality.
 */
export class Database {
  /**
   * A singleton instance of sequelize that will be used across the application.
   *
   * @summary It's important to not use any other instances of sequelize other than this instance unless you have more than one database.
   */
  public static readonly sequelize: Sequelize = sequelize;

  /**
   * Tests the connection to the database using the provided credentials.
   */
  public static testDatabaseConnection(): Promise<void> {
    return sequelize.authenticate();
  }

  /**
   * Sync all defined models to the DB.
   * @param force If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
   */
  public static syncDatabase(force?: boolean): Promise<never> {
    return sequelize.sync({ force: force });
  }

  /**
   * The Category model that maps the `categories table` in the database.
   * The model name will be `categories` also.
   */
  public static get Categories(): typeof Category {
    return Category;
  }

  /**
   * The Product model that maps the `products table` in the database.
   * The model name will be `products` also.
   */
  public static get Products(): typeof Product {
    return Product;
  }
}
