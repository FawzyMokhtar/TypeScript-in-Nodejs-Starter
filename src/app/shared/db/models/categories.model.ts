import mongoose, { Schema, Document } from 'mongoose';
import { Database } from '../helpers';

/**
 * The schema definition for the category model.
 */
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
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
 * The category data model representation.
 */
export interface Category extends Document {
  /**
   * Gets or sets the object id of the category.
   * @summary this property will has value only if the option `_id` is set to `true` on the model schema definition.
   */
  _id: mongoose.Types.ObjectId;

  /**
   * Gets the string value for the object id of the category.
   * @summary this property will has value only if the option `id` is set to `true` on the model schema definition.
   */
  readonly id: string;

  /**
   * Gets or sets the name of category.
   */
  name: string;
}

/* Add the implementation of the id property. */
schema.virtual('id').get(function(this: Category) {
  return this._id ? this._id.toString() : undefined;
});

/**
 * The Category model that maps the `categories collection` in the database.
 * The model name will be `Category` also.
 */
export const Category = Database.mongoose.model<Category>('Category', schema);
