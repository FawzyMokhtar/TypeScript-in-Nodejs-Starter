import _ from 'lodash';
import { Op } from 'sequelize';
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
      if (!!(await Database.Categories.count({ where: { name: data.name } }))) {
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
      result.data = category.get() as CategoryDTO;
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

      const categories = await Database.Categories.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        offset,
        limit,
        raw: true
      });

      result.data = categories.rows;

      result.paginationInfo = genPaginationInfo(page, pageSize, categories.count, categories.rows.length);
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Finds the category with the given id.
   * @param id The id of the category.
   */
  public static async findById(id: number): Promise<DataResult<CategoryDTO>> {
    const result: DataResult<CategoryDTO> = {};

    try {
      result.data = await Database.Categories.findByPk(id, { raw: true });
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
      /** The category to be updated. */
      const category = await Database.Categories.findByPk(data.id);

      /* Make sure that category is exists in the database. */
      if (!category) {
        result.isNotFound = true;
        return result;
      }

      //#region validate data-model

      /** Check if name is already exists for another category in database. */
      const nameExists = !!(await Database.Categories.count({
        where: {
          [Op.and]: [{ name: data.name }, { id: { [Op.ne]: category.id } }]
        }
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
      await category.update({ name: data.name });

      result.data = category.get() as CategoryDTO;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  /**
   * Deletes an existing category.
   * @param id The id of the existing category.
   */
  public static async delete(id: number): Promise<DataResult<CategoryDTO>> {
    const result: DataResult<CategoryDTO> = {};

    try {
      /** The category to be deleted. */
      const category = await Database.Categories.findByPk(id);

      /* Make sure that category is exists in the database. */
      if (!category) {
        result.isNotFound = true;
        return result;
      } else if (!!(await Database.Products.count({ where: { categoryId: id } }))) {
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
      await category.destroy();

      result.data = category.get() as CategoryDTO;
    } catch (error) {
      result.error = error;
    }

    return result;
  }
}
