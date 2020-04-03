import mongoose, { Connection } from 'mongoose';
import { Category, Product } from '../models';

/* 
   Connect to database.
   NOTE: i'm connecting here to the database `typescript_in_nodejs_starter_db` on my `localhost` with no username or password.
   You can change this data and use your data instead.
 */

/**
 * A singleton instance of mongoose connection that will be used across the application.
 *
 * @summary It's important to not use any other instances of mongoose other than this instance unless you have more than one database.
 */
const dbConnection = mongoose.createConnection('mongodb://localhost:27017/typescript_in_nodejs_starter_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/**
 * The Database helper that includes all functionalities related to the database and all of it's models.
 * @summary All of this class members are static.
 * @summary All database models should be registered in this class.
 * @summary All database models should be accessed only through this class as central point of database functionality.
 */
export class Database {
  /**
   * A singleton instance of mongoose connection that will be used across the application.
   *
   * @summary It's important to not use any other instances of mongoose other than this instance unless you have more than one database.
   */
  public static readonly mongoose: Connection = dbConnection;

  /**
   * The Category model that maps the `categories collection` in the database.
   * The model name will be `Category` also.
   */
  public static get Categories(): typeof Category {
    return Category;
  }

  /**
   * The Product model that maps the `products collection` in the database.
   * The model name will be `Product` also.
   */
  public static get Products(): typeof Product {
    return Product;
  }
}
