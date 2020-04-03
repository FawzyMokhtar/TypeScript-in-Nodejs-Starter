import mongoose from 'mongoose';
import _ from 'lodash';
import { Database, DataResult, paginate, genPaginationInfo, AppErrorCode } from '../../shared';
import { ProductDTO, CreateProductInput, UpdateProductInput } from '../models';

/**
 * The Products-Module data-access service that includes the functionalities to create, read, update and delete categories.
 */
export class ProductsDataAccess {
  /**
   * Creates a new product based on the provided data-model.
   * @param data The data-model to create the new product.
   */
  public static async create(data: CreateProductInput): Promise<DataResult<ProductDTO>> {
    const result: DataResult<ProductDTO> = {};

    try {
      //#region validate data-model

      /** Check if name is already exists in database. */
      if (!!(await Database.Products.countDocuments({ name: data.name }))) {
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

      /*
       * Validate id is a valid mongo-object-id otherwise the find* methods will throw a error.
       */
      if (!mongoose.Types.ObjectId.isValid(data.categoryId)) {
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

      /** The category that the new product will belong to. */
      const category = await Database.Categories.findById(data.categoryId);

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

      const product = await Database.Products.create({ name: data.name, price: data.price, category: category._id });

      /* Reload the product to get the category that the product belongs to. */
      result.data = (await this.findById(product._id.toString())).data;
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
    categories: string[],
    page: number,
    pageSize: number
  ): Promise<DataResult<ProductDTO[]>> {
    const result: DataResult<ProductDTO[]> = {};

    try {
      page = page || 1;
      const { offset, limit } = paginate(page, pageSize);

      /* Remove any non-mongo-object-id from the set, to avoid having an error. */
      _.remove(categories, (category: string) => !mongoose.Types.ObjectId.isValid(category));

      /** The query that will be used to match categories.  */
      const query = {
        name: { $regex: RegExp(name, 'i') },
        $or: [
          { $expr: !categories || !categories.length },
          { category: { $in: categories.map(category => new mongoose.Types.ObjectId(category)) } }
        ]
      };

      const products = await Database.Products.find(query)
        .populate('category')
        .skip(offset)
        .limit(limit);

      const count = await Database.Products.countDocuments(query);

      result.data = products as ProductDTO[];

      result.paginationInfo = genPaginationInfo(page, pageSize, count, products.length);
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Finds the product with the given id.
   * @param id The id of the product.
   */
  public static async findById(id: string): Promise<DataResult<ProductDTO>> {
    const result: DataResult<ProductDTO> = {};

    try {
      /*
       * Validate id is a valid mongo-object-id otherwise the find* methods will throw a error.
       */
      if (!mongoose.Types.ObjectId.isValid(id)) {
        result.isNotFound = true;
        return result;
      }

      result.data = (await Database.Products.findById(id).populate('category')) as ProductDTO;
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Updates an existing product based on the provided data-model.
   * @param data The data-model to update the existing product.
   */
  public static async update(data: UpdateProductInput): Promise<DataResult<ProductDTO>> {
    const result: DataResult<ProductDTO> = {};

    try {
      /*
       * Validate id is a valid mongo-object-id otherwise the find* methods will throw a error.
       */
      if (!mongoose.Types.ObjectId.isValid(data.id)) {
        result.isNotFound = true;
        return result;
      } else if (!mongoose.Types.ObjectId.isValid(data.categoryId)) {
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

      /** The product to be updated. */
      const product = await Database.Products.findById(data.id);

      /* Make sure that product is exists in the database. */
      if (!product) {
        result.isNotFound = true;
        return result;
      }

      //#region validate data-model

      /** Check if name is already exists for another product in database. */
      const nameExists = !!(await Database.Products.countDocuments({
        _id: { $ne: new mongoose.Types.ObjectId(data.id) },
        name: data.name
      }));
      if (nameExists) {
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
      const category = await Database.Categories.findById(data.categoryId);

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
      await product.updateOne({ name: data.name, price: data.price, category: category._id });

      /* Reload the product to get the category that the product belongs to. */
      result.data = (await this.findById(product._id.toString())).data;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Deletes an existing product.
   * @param id The id of the existing product.
   */
  public static async delete(id: string): Promise<DataResult<ProductDTO>> {
    const result: DataResult<ProductDTO> = {};

    try {
      /*
       * Validate id is a valid mongo-object-id otherwise the find* methods will throw a error.
       */
      if (!mongoose.Types.ObjectId.isValid(id)) {
        result.isNotFound = true;
        return result;
      }

      /** The product to be deleted. */
      const product = await Database.Products.findById(id).populate('category');

      /* Make sure that product is exists in the database. */
      if (!product) {
        result.isNotFound = true;
        return result;
      }

      /* Delete product from database. */
      await product.remove();

      result.data = product as ProductDTO;
    } catch (error) {
      result.error = error;
    }

    return result;
  }
}
