import _ from 'lodash';
import { Database, DataResult, paginate, genPaginationInfo, AppErrorCode } from '../../shared';
import { Category, CreateCategoryInput, UpdateCategoryInput } from '../models';

/**
 * The Categories-Module data-access service that includes the functionalities to create, read, update and delete categories.
 */
export class CategoriesDataAccess {
  /**
   * Creates a new category based on the provided data-model.
   * @param data The data-model to create the new category.
   */
  public static async create(data: CreateCategoryInput): Promise<DataResult<Category>> {
    const result: DataResult<Category> = {};

    try {
      const db = await Database.connect();

      //#region validate data-model

      /** Check if name is already exists in database. */
      if (db.categories.some(item => item.name === data.name)) {
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'name',
            title: 'Field value already exists',
            detail: 'Category name already exists'
          }
        ];
        return result;
      }

      //#endregion

      /** The id that should be assigned to the new category. */
      const id = (_.max(db.categories.map(category => category.id)) || 0) + 1;

      result.data = { id, name: data.name };

      /* Add the newly created category to the database. */
      db.categories.push(result.data);
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Searches the categories and find the set of categories matching the provided query params.
   * @param name The name or part of the name of the category.
   * @param page The number of current pagination page.
   * @param pageSize The maximum allowed number of categories per-page.
   */
  public static async search(name: string, page: number, pageSize: number): Promise<DataResult<Category[]>> {
    const result: DataResult<Category[]> = {};

    try {
      const db = await Database.connect();

      page = page || 1;
      const { skip, limit } = paginate(page, pageSize);

      result.data = db.categories
        .filter(category => category.name.includes(name) || !name)
        .slice(skip)
        .slice(0, limit);

      result.paginationInfo = genPaginationInfo(page, pageSize, db.categories.length, result.data.length);
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Finds the category with the given id.
   * @param id The id of the category.
   */
  public static async findById(id: number): Promise<DataResult<Category>> {
    const result: DataResult<Category> = {};

    try {
      const db = await Database.connect();

      result.data = db.categories.find(category => category.id === id);
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Updates an existing category based on the provided data-model.
   * @param data The data-model to update the existing category.
   */
  public static async update(data: UpdateCategoryInput): Promise<DataResult<Category>> {
    const result: DataResult<Category> = {};

    try {
      const db = await Database.connect();

      /** The category to be updated. */
      const category = db.categories.find(category => category.id === data.id);

      /* Make sure that category is exists in the database. */
      if (!category) {
        result.isNotFound = true;
        return result;
      }

      //#region validate data-model

      /** Check if name is already exists for another category in database. */
      if (db.categories.some(item => item.id !== category.id && item.name === data.name)) {
        result.validationErrors = [
          {
            code: AppErrorCode.ValueExists,
            source: 'name',
            title: 'Field value already exists',
            detail: 'Category name already exists'
          }
        ];
        return result;
      }

      //#endregion

      /* Update category data. */
      category.name = data.name;

      result.data = category;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Deletes an existing category.
   * @param id The id of the existing category.
   */
  public static async delete(id: number): Promise<DataResult<Category>> {
    const result: DataResult<Category> = {};

    try {
      const db = await Database.connect();

      /** The category to be deleted. */
      const category = db.categories.find(category => category.id === id);

      /* Make sure that category is exists in the database. */
      if (!category) {
        result.isNotFound = true;
        return result;
      } else if (db.products.some(product => product.categoryId === id)) {
        /* If there are any products rely on this category. */
        result.validationErrors = [
          {
            code: AppErrorCode.CantBeDeleted,
            title: `Entity can't be deleted`,
            detail: `Category can't be deleted because there are some products related to this category`
          }
        ];
        return result;
      }

      /* Delete category from database. */
      _.remove(db.categories, item => item.id === category.id);

      result.data = category;
    } catch (error) {
      result.error = error;
    }

    return result;
  }
}
