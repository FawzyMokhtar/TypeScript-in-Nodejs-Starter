import { Model, DataTypes, Association } from 'sequelize';
import { Database } from '../helpers';
import { Product } from './products.model';

/**
 * The Category model that maps the `categories table` in the database.
 * The model name will be `categories` also.
 */
export class Category extends Model {
  /* 
     Any property or method will be declared in this class should has
     the `non-null assertion` `!` is required in strict mode.
  */

  /**
   * Gets or the sets the id of the category.
   */
  public id!: number;

  /**
   * Gets or sets the name of the category.
   */
  public name!: string;

  /* 
     Since TypeScript cannot determine model association at compile time
     we have to declare them here purely virtually
     these will not exist until `Model.init` was called.
  */

  /**
   * Gets a set of products belong to the current category.
   * @summary An pre-declared possible inclusion that will only be populated if you actively include a relation.
   */
  public readonly products?: Product[];

  /**
   * An object hash from alias to association object
   */
  public static readonly associations: {
    products: Association<Category, Product>;
  };
}

/**
 * Define the model structure here.
 */
Category.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    sequelize: Database.sequelize,
    modelName: 'categories' /* The model name & also the mapped database table name.  */,
    timestamps: false
  }
);
