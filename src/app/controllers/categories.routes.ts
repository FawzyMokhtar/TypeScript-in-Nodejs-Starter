import { Router, Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Ok, NotFound, validationErrorFormatter, BadRequest } from '../shared';
import {
  CategoriesDataAccess,
  createCategoryValidator,
  CreateCategoryInput,
  updateCategoryValidator,
  UpdateCategoryInput
} from '../categories';

/**
 * The Categories-Module router that holds all module routes.
 */
export const categoriesRouter = Router();

/**
 * The relative route for the Categories-Module.
 *
 * No leading or trailing slashes required.
 */
export const categoriesRelativeRoute = 'categories';

/* Create new category route. */
categoriesRouter.post('', createCategoryValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    /** The validation errors that may result from validating request [body', 'cookies', 'headers', 'params' or 'query' ] */
    const validationErrors = validationResult(req)
      .formatWith(validationErrorFormatter)
      .array();

    if (validationErrors.length) {
      return BadRequest(res, { errors: validationErrors });
    }

    const data: CreateCategoryInput = req.body;
    const result = await CategoriesDataAccess.create(data);

    if (result.validationErrors && result.validationErrors.length) {
      BadRequest(res, { errors: result.validationErrors });
    } else if (result.data) {
      Ok(res, { data: result.data });
    } else if (result.error) {
      next(result.error);
    }
  } catch (error) {
    next(error);
  }
});

/* Search categories route. */
categoriesRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
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

/* Find category by id route. */
categoriesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
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

/* Update an existing category route. */
categoriesRouter.put('', updateCategoryValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    /** The validation errors that may result from validating request [body', 'cookies', 'headers', 'params' or 'query' ] */
    const validationErrors = validationResult(req)
      .formatWith(validationErrorFormatter)
      .array();

    if (validationErrors.length) {
      return BadRequest(res, { errors: validationErrors });
    }

    const data: UpdateCategoryInput = req.body;
    const result = await CategoriesDataAccess.update(data);

    if (result.isNotFound) {
      NotFound(res);
    } else if (result.validationErrors && result.validationErrors.length) {
      BadRequest(res, { errors: result.validationErrors });
    } else if (result.data) {
      Ok(res, { data: result.data });
    } else if (result.error) {
      next(result.error);
    }
  } catch (error) {
    next(error);
  }
});

/* Delete by id route. */
categoriesRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoriesDataAccess.delete(Number.parseInt(req.params.id));

    if (result.isNotFound) {
      NotFound(res);
    } else if (result.validationErrors && result.validationErrors.length) {
      BadRequest(res, { errors: result.validationErrors });
    } else if (result.data) {
      Ok(res, { data: result.data });
    } else if (result.error) {
      next(result.error);
    }
  } catch (error) {
    next(error);
  }
});
