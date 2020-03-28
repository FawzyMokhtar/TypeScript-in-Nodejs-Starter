import _ from 'lodash';
import { Op } from 'sequelize';
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
      //#region validate data-model

      /** Check if name is already exists in database. */
      if (!!(await Database.Products.count({ where: { name: data.name } }))) {
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
      const category = await Database.Categories.findByPk(data.categoryId);

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

      const product = await Database.Products.create({ name: data.name, price: data.price, categoryId: category.id });

      /* Reload the product to get the category that the product belongs to. */
      result.data = (await this.findById(product.id)).data;
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
      page = page || 1;
      const { offset, limit } = paginate(page, pageSize);

      const products = await Database.Products.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          },
          categoryId: {
            [Op.in]: categories
          }
        },
        include: [{ model: Database.Categories, required: true }],
        offset,
        limit,
        raw: true,
        nest: true
      });

      result.data = products.rows as Product[];

      result.paginationInfo = genPaginationInfo(page, pageSize, products.count, products.rows.length);
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
      result.data = (await Database.Products.findByPk(id, {
        include: [{ model: Database.Categories, required: true }],
        raw: true,
        nest: true
      })) as Product;
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
  public static async update(data: UpdateProductInput): Promise<DataResult<Product>> {
    const result: DataResult<Product> = {};

    try {
      /** The product to be updated. */
      const product = await Database.Products.findByPk(data.id);

      /* Make sure that product is exists in the database. */
      if (!product) {
        result.isNotFound = true;
        return result;
      }

      //#region validate data-model

      /** Check if name is already exists for another product in database. */
      const nameExists = !!(await Database.Products.count({
        where: {
          [Op.and]: [{ name: data.name }, { id: { [Op.ne]: product.id } }]
        }
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
      const category = await Database.Categories.findByPk(data.categoryId);

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
      await product.update({ name: data.name, price: data.price, categoryId: category.id });

      /* Reload the product to get the category that the product belongs to. */
      result.data = (await this.findById(product.id)).data;
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
      /** The product to be deleted. */
      const product = await Database.Products.findByPk(id, {
        include: [{ model: Database.Categories, required: true }]
      });

      /* Make sure that product is exists in the database. */
      if (!product) {
        result.isNotFound = true;
        return result;
      }

      /* Delete product from database. */
      await product.destroy();

      result.data = product.get({ plain: true }) as Product;
    } catch (error) {
      result.error = error;
    }

    return result;
  }
}
