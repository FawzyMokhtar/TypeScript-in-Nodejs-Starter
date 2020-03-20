import { Router, Request, Response, NextFunction } from 'express';
import { Ok, NotFound } from '../shared';
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

/* Search route. */
CategoriesRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoriesDataAccess.search(req.query.name, req.query.page, req.query.pageSize);

    if (result.data) {
      Ok(res, { data: result.data, meta: { ...result.paginationInfo } });
    } else if (result.error) {
      next(result.error);
    }
  } catch (error) {
    next(error);
  }
});

/* Find by id route. */
CategoriesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoriesDataAccess.findById(Number.parseInt(req.params.id));

    if (result.isNotFound) {
      NotFound(res);
    } else if (result.data) {
      Ok(res, { data: result.data });
    } else if (result.error) {
      next(result.error);
    }
  } catch (error) {
    next(error);
  }
});
