import { Category } from './categories.model';
import { Product } from './products.model';

/** Don't forget to export each model. */
export * from './categories.model';
export * from './products.model';

/*
  ******************************* All models relations defined here. ***********************************

  NOTE: All CASCADING such as (onUpdate & onDelete) should be disabled because it is a bad practice and i don't recommend it,
  you should always be aware of what you are deleting. 
 */

/**
 * This will add a `categoryId` field in the product model.
 * And setup a 1:m relationship between category & product.
 * One category has many products & each product belongs only to one category.
 */
Product.belongsTo(Category, {
  foreignKey: { allowNull: false },
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION'
});

Category.hasMany(Product, {
  foreignKey: { allowNull: false },
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION'
});
