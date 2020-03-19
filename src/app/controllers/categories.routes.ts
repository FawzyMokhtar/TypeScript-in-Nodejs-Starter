import { Router, Request, Response } from 'express';
import { OK, InternalServerError } from '../shared';
import { CategoriesDataAccess } from '../categories';

/**
 * The Categories-Module router that holds all module routes.
 */
export const CategoriesRouter = Router();

/**
 * The relative route for the Categories-Module.
 */
export const CategoriesRoute = '/categories';

CategoriesRouter.get('', async (req: Request, res: Response) => {
  const result = await CategoriesDataAccess.search(req.query.name, req.query.page, req.query.pageSize);

  if (result.data) {
    return OK(res, {
      data: result.data,
      meta: {
        ...result.paginationInfo
      }
    });
  } else if (result.error) {
    return InternalServerError(res, result.error);
  }
});
