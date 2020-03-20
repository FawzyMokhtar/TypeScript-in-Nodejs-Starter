import { Router, Request, Response, NextFunction } from 'express';
import { OK, InternalServerError } from '../shared';
import { CategoriesDataAccess } from '../categories';

/**
 * The Categories-Module router that holds all module routes.
 */
export const CategoriesRouter = Router();

/**
 * The relative route for the Categories-Module.
 *
 * No leading or trailing slashes required.
 */
export const CategoriesRelativeRoute = 'categories';

CategoriesRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoriesDataAccess.search(req.query.name, req.query.page, req.query.pageSize);
    if (result.data) {
      OK(res, {
        data: result.data,
        meta: {
          ...result.paginationInfo
        }
      });
    } else if (result.error) {
      next(result.error);
    }
  } catch (error) {
    next(error);
  }
});
