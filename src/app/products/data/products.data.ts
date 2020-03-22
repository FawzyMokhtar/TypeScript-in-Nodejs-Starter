import _ from 'lodash';
import { Database, DataResult, paginate, genPaginationInfo, AppErrorCode } from '../../shared';
import { Product, CreateProductInput, UpdateProductInput } from '../models';

/**
 * The Products-Module data-access service that includes the functionalities to create, read, update and delete categories.
 */
export class ProductsDataAccess {
  /**
   * Creates a new product based on the provided data-model.
   * @param data The data-model to create the new product.
   */
  public static async create(data: CreateProductInput): Promise<DataResult<Product>> {
    const result: DataResult<Product> = {};

    try {
      const db = await Database.connect();

      //#region validate data-model

      /** Check if name is already exists in database. */
      if (db.products.some(item => item.name === data.name)) {
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'name',
            title: 'Field value already exists',
            detail: 'Product name already exists'
          }
        ];
        return result;
      }

      /** The category that the new product will belong to. */
      const category = db.categories.find(item => item.id === data.categoryId);

      /* Make sure that category is exists in the database. */
      if (!category) {
        result.validationErrors = [
          {
            code: AppErrorCode.RelatedEntityNotFound,
            source: 'categoryId',
            title: 'Related entity not found',
            detail: `Product's category not found`
          }
        ];
        return result;
      }

      //#endregion

      /** The id that should be assigned to the new product. */
      const id = (_.max(db.products.map(product => product.id)) || 0) + 1;

      result.data = { id, name: data.name, price: data.price, categoryId: category.id, category };

      /* Add the newly created product to the database. */
      db.products.push(result.data);
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Searches the products and find the set of products matching the provided query params.
   * @param name The name or part of the name of the category, The search is case-insensitive.
   * @param categories An array of categories ids that the products should belong to,
   * if omitted of empty all products from all categories will be returned.
   * @param page The number of current pagination page.
   * @param pageSize The maximum allowed number of products per-page.
   */
  public static async search(
    name: string,
    categories: number[],
    page: number,
    pageSize: number
  ): Promise<DataResult<Product[]>> {
    const result: DataResult<Product[]> = {};

    try {
      const db = await Database.connect();

      page = page || 1;
      const { skip, limit } = paginate(page, pageSize);

      /** The query that will be used to filter products. */
      const query = (product: Product): boolean =>
        (!name || product.name.toLowerCase().includes(name.toLowerCase())) &&
        (!categories || !categories.length || categories.includes(product.categoryId));

      result.data = db.products
        .filter(query)
        .slice(skip)
        .slice(0, limit)
        .map(product => {
          /* Bind each product's category. */
          product.category = db.categories.filter(category => category.id === product.categoryId)[0];
          return product;
        });

      result.paginationInfo = genPaginationInfo(page, pageSize, db.products.filter(query).length, result.data.length);
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Finds the product with the given id.
   * @param id The id of the product.
   */
  public static async findById(id: number): Promise<DataResult<Product>> {
    const result: DataResult<Product> = {};

    try {
      const db = await Database.connect();

      result.data = db.products.find(product => product.id === id);
      result.isNotFound = !result.data;

      /* Bind product's category if the product was found. */
      if (result.data) {
        result.data.category = db.categories.filter(
          category => result.data && category.id === result.data.categoryId
        )[0];
      }
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Updates an existing product based on the provided data-model.
   * @param data The data-model to update the existing product.
   */
  public static async update(data: UpdateProductInput): Promise<DataResult<Product>> {
    const result: DataResult<Product> = {};

    try {
      const db = await Database.connect();

      /** The product to be updated. */
      const product = db.products.find(product => product.id === data.id);

      /* Make sure that product is exists in the database. */
      if (!product) {
        result.isNotFound = true;
        return result;
      }

      //#region validate data-model

      /** Check if name is already exists for another product in database. */
      if (db.products.some(item => item.id !== product.id && item.name === data.name)) {
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'name',
            title: 'Field value already exists',
            detail: 'Product name already exists'
          }
        ];
        return result;
      }

      /** The new category that the product will belong to. */
      const category = db.categories.find(item => item.id === data.categoryId);

      /* Make sure that category is exists in the database. */
      if (!category) {
        result.validationErrors = [
          {
            code: AppErrorCode.RelatedEntityNotFound,
            source: 'categoryId',
            title: 'Related entity not found',
            detail: `Product's category not found`
          }
        ];
        return result;
      }

      //#endregion

      /* Update product data. */
      product.name = data.name;
      product.price = data.price;
      product.categoryId = category.id;
      product.category = category;

      result.data = product;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Deletes an existing product.
   * @param id The id of the existing product.
   */
  public static async delete(id: number): Promise<DataResult<Product>> {
    const result: DataResult<Product> = {};

    try {
      const db = await Database.connect();

      /** The product to be deleted. */
      const product = db.products.find(product => product.id === id);

      /* Make sure that product is exists in the database. */
      if (!product) {
        result.isNotFound = true;
        return result;
      }

      /* Delete product from database. */
      _.remove(db.products, item => item.id === product.id);

      result.data = product;
    } catch (error) {
      result.error = error;
    }

    return result;
  }
}
