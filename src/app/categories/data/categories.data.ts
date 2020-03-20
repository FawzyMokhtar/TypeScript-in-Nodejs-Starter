import { Database, DataResult, paginate, genPaginationInfo } from '../../shared';
import { Category } from '../models';

/**
 * The Categories-Module data-access service that includes the functionalities to create, read, update and delete categories.
 */
export class CategoriesDataAccess {
  /**
   * Searches the categories and find the set of categories matching the provided query params.
   * @param name The name or part of the name of the category.
   * @param page The number of current pagination page.
   * @param pageSize The maximum allowed number of categories per-page.
   */
  public static async search(name: string, page: number, pageSize: number): Promise<DataResult<Category[]>> {
    const result: DataResult<Category[]> = {};

    try {
      const db = await Database.load();

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
      const db = await Database.load();

      result.data = db.categories.find(category => category.id === id);
      result.isNotFound = !result.data;
    } catch (error) {
      result.error = error;
    }

    return result;
  }
}
