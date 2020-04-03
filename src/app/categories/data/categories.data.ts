import mongoose from 'mongoose';
import { Database, DataResult, paginate, genPaginationInfo, AppErrorCode } from '../../shared';
import { CategoryDTO, CreateCategoryInput, UpdateCategoryInput } from '../models';

/**
 * The Categories-Module data-access service that includes the functionalities to create, read, update and delete categories.
 */
export class CategoriesDataAccess {
  /**
   * Creates a new category based on the provided data-model.
   * @param data The data-model to create the new category.
   */
  public static async create(data: CreateCategoryInput): Promise<DataResult<CategoryDTO>> {
    const result: DataResult<CategoryDTO> = {};

    try {
      //#region validate data-model

      /** Check if name is already exists in database. */
      if (!!(await Database.Categories.countDocuments({ name: data.name }))) {
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

      const category = await Database.Categories.create({ name: data.name });
      result.data = category;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Searches the categories and find the set of categories matching the provided query params.
   * @param name The name or part of the name of the category, The search is case-insensitive.
   * @param page The number of current pagination page.
   * @param pageSize The maximum allowed number of categories per-page.
   */
  public static async search(name: string, page: number, pageSize: number): Promise<DataResult<CategoryDTO[]>> {
    const result: DataResult<CategoryDTO[]> = {};

    try {
      page = page || 1;
      const { offset, limit } = paginate(page, pageSize);

      /** The query that will be used to match categories.  */
      const query = { name: { $regex: RegExp(name, 'i') } };

      const categories = await Database.Categories.find(query)
        .skip(offset)
        .limit(limit);

      const count = await Database.Categories.countDocuments(query);

      result.data = categories;

      result.paginationInfo = genPaginationInfo(page, pageSize, count, categories.length);
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Finds the category with the given id.
   * @param id The id of the category.
   */
  public static async findById(id: string): Promise<DataResult<CategoryDTO>> {
    const result: DataResult<CategoryDTO> = {};

    try {
      /*
       * Validate id is a valid mongo-object-id otherwise the find* methods will throw a error.
       */
      if (!mongoose.Types.ObjectId.isValid(id)) {
        result.isNotFound = true;
        return result;
      }

      result.data = await Database.Categories.findById(id);
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
  public static async update(data: UpdateCategoryInput): Promise<DataResult<CategoryDTO>> {
    const result: DataResult<CategoryDTO> = {};

    try {
      /*
       * Validate id is a valid mongo-object-id otherwise the find* methods will throw a error.
       */
      if (!mongoose.Types.ObjectId.isValid(data.id)) {
        result.isNotFound = true;
        return result;
      }

      /** The category to be updated. */
      const category = await Database.Categories.findById(data.id);

      /* Make sure that category is exists in the database. */
      if (!category) {
        result.isNotFound = true;
        return result;
      }

      //#region validate data-model

      /** Check if name is already exists for another category in database. */
      const nameExists = !!(await Database.Categories.countDocuments({
        _id: { $ne: new mongoose.Types.ObjectId(data.id) },
        name: data.name
      }));
      if (nameExists) {
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
      await category.updateOne({ name: data.name });

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
  public static async delete(id: string): Promise<DataResult<CategoryDTO>> {
    const result: DataResult<CategoryDTO> = {};

    try {
      /*
       * Validate id is a valid mongo-object-id otherwise the find* methods will throw a error.
       */
      if (!mongoose.Types.ObjectId.isValid(id)) {
        result.isNotFound = true;
        return result;
      }

      /** The category to be deleted. */
      const category = await Database.Categories.findById(id);

      /* Make sure that category is exists in the database. */
      if (!category) {
        result.isNotFound = true;
        return result;
      } else if (!!(await Database.Products.countDocuments({ _id: mongoose.Types.ObjectId(id) }))) {
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
      await category.remove();

      result.data = category;
    } catch (error) {
      result.error = error;
    }

    return result;
  }
}
