/**
 * Represents an application http-response metadata.
 */
export interface AppHttpResponseMeta {
  /**
   * Gets or sets the current pagination page.
   */
  page?: number;

  /**
   * Gets or sets the maximum allowed items per-page.
   */
  pageSize?: number;

  /**
   * Gets or sets the count of the actual items in the current page.
   */
  count?: number;

  /**
   * Gets or sets the total count of items available in the database those match the query criteria.
   */
  total?: number;

  /**
   * Gets or sets the number of the previous pagination page.
   */
  previousPage?: number | undefined;

  /**
   * Gets or sets the number of the next pagination page.
   */
  nextPage?: number | undefined;

  /**
   * Gets or sets the total available pagination pages those match the query criteria.
   */
  totalPages?: number;
}
