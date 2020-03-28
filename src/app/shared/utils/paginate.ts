/**
 * Solves the pagination data provided and calculates the `offset` and `limit` factors.
 * @param {number} page The current pagination page number.
 * @param {number} pageSize The maximum number of items allowed in each pagination page.
 */
export function paginate(page: number, pageSize: number): { offset: number; limit: number } {
  const pagination = { offset: 0, limit: 0 };

  pagination.limit = Math.abs(pageSize) || 0;
  page = (Math.abs(page) || 1) - 1;
  pagination.offset = pagination.limit * page;

  return pagination;
}
