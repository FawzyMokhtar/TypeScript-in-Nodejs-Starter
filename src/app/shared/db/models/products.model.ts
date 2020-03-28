import { Model, DataTypes, Association } from 'sequelize';
import { Database } from '../helpers';
import { Category } from './categories.model';

/**
 * The Products model that maps the `products table` in the database.
 * The model name will be `products` also.
 */
export class Product extends Model {
  /* 
     Any property or method will be declared in this class should has
     the `non-null assertion` `!` is required in strict mode.
  */

  /**
   * Gets or the sets the id of the product.
   */
  public id!: number;

  /**
   * Gets or sets the name of the product.
   */
  public name!: string;

  /**
   * Gets or sets the price of the product.
   */
  public price!: number;

  /**
   * Gets or sets the id of the category that the product belongs to.
   */
  public categoryId!: number;

  /* 
     Since TypeScript cannot determine model association at compile time
     we have to declare them here purely virtually
     these will not exist until `Model.init` was called.
  */

  /**
   * Gets the category which the current product belongs to.
   * @summary An pre-declared possible inclusion that will only be populated if you actively include a relation.
   */
  public readonly category?: Category;

  /**
   * An object hash from alias to association object
   */
  public static readonly associations: {
    category: Association<Product, Category>;
  };
}

/**
 * Define the model structure here.
 */
Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(19, 2),
      allowNull: false
    }
  },
  {
    sequelize: Database.sequelize,
    modelName: 'products' /* The model name & also the mapped database table name.  */,
    timestamps: false
  }
);
