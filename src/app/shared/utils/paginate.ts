/**
 * Solves the pagination data provided and calculates the `limit` and `skip` factors.
 * @param {number} page The current pagination page number.
 * @param {number} pageSize The maximum number of items allowed in each pagination page.
 */
export function paginate(page: number, pageSize: number): { limit: number; skip: number } {
  const pagination = { limit: 0, skip: 0 };

  pagination.limit = Math.abs(pageSize) || 0;
  page = (Math.abs(page) || 1) - 1;
  pagination.skip = pagination.limit * page;

  return pagination;
}
