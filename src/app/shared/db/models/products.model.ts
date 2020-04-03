import mongoose, { Schema, Document } from 'mongoose';
import { Database } from '../helpers';
import { Category } from './categories.model';

/**
 * The schema definition for the product model.
 */
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true
    }
  },
  {
    toObject: {
      virtuals: true
    } /* Allow model instances to have the user defined virtual properties when using the .toObject() method. */,
    toJSON: {
      virtuals: true
    } /* Allow model instances to have the user defined virtual properties when using the .toObject() method. */,
    versionKey: false /* Skip versioning newly created or updated documents. */,
    skipVersioning: true
  }
);

/**
 * The product data model representation.
 */
export interface Product extends Document {
  /**
   * Gets or sets the object id of the product.
   * @summary this property will has value only if the option `_id` is set to `true` on the model schema definition.
   */
  _id: mongoose.Types.ObjectId;

  /**
   * Gets the string value for the object id of the product.
   * @summary this property will has value only if the option `id` is set to `true` on the model schema definition.
   */
  readonly id: string;

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
   *
   * @summary if the category path was populated the value of this property will be the populated category not the id of it.
   */
  category: mongoose.Types.ObjectId | Category;
}

/* Add the implementation of the id property. */
schema.virtual('id').get(function(this: Product) {
  return this._id ? this._id.toString() : undefined;
});

/**
 * The Product model that maps the `products collection` in the database.
 * The model name will be `Product` also.
 */
export const Product = Database.mongoose.model<Product>('Product', schema);
