import { Request } from 'express';

/**
 * Returns an array of Integers by parsing the given query param as a comma separated string,
 * or an empty array if the query parameter was not found of empty.
 *
 * e.g. if the query param value was `?ids=123,132,156` the result will be `[123, 132, 156]`.
 *
 * It's important to know that this util function uses @see parseInt function to parse each element in the query param value.
 * @param req The express request.
 * @param param The name of the query param.
 * @param separator An optional separator, The default is `,`.
 */
export function getQueryParamAsIntArray(req: Request, param: string, separator = ','): number[] {
  if (!req.query[param]) {
    return [];
  }

  return (req.query[param] as string).split(separator).map(item => parseInt(item));
}
