import { PaginationInfo } from '../models';

/**
 * Generates and returns pagination info according to the given information.
 * @param page The current page number.
 * @param pageSize The maximum allowed items per-page.
 * @param itemsTotalCount The total count of available items those match the query criteria.
 * @param itemsCount The count of the items in the current page.
 */
export function genPaginationInfo(
  page: number,
  pageSize: number,
  itemsTotalCount: number,
  itemsCount: number
): PaginationInfo {
  const totalPages = Math.ceil(itemsTotalCount / pageSize);

  return {
    page,
    pageSize,
    count: itemsCount,
    total: itemsTotalCount,
    previousPage: page - 1 ? page - 1 : undefined,
    nextPage: totalPages > page ? page + 1 : undefined,
    totalPages
  };
}
