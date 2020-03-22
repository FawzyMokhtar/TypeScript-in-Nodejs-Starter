import { check } from 'express-validator';
import { AppErrorCode } from '../../shared';

/**
 * The update category data-model validator.
 */
export const updateProductValidator = [
  /* id field. */
  check('id')
    .exists({ checkNull: true })
    .withMessage({
      code: AppErrorCode.IsRequired,
      title: 'Field is required',
      detail: 'Id is required'
    })

    .isInt({ gt: 0 })
    .withMessage({
      code: AppErrorCode.InvalidType,
      title: 'Invalid field type',
      detail: 'Id must be an (Integer)'
    }),

  /* name field. */
  check('name')
    .exists({ checkNull: true })
    .withMessage({
      code: AppErrorCode.IsRequired,
      title: 'Field is required',
      detail: 'Name is required'
    })

    .isString()
    .withMessage({
      code: AppErrorCode.InvalidType,
      title: 'Invalid field type',
      detail: 'Name must be series of characters (String)'
    })

    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage({
      code: AppErrorCode.InvalidLength,
      title: 'Invalid field length',
      detail: 'Name must be from (2 - 50) characters length'
    }),

  /* price field. */
  check('price')
    .exists({ checkNull: true })
    .withMessage({
      code: AppErrorCode.IsRequired,
      title: 'Field is required',
      detail: 'Price is required'
    })

    .isFloat({ gt: 0 })
    .withMessage({
      code: AppErrorCode.InvalidType,
      title: 'Invalid field type',
      detail: 'Price must be a positive (Float, Decimal) number'
    }),

  /* categoryId field. */
  check('categoryId')
    .exists({ checkNull: true })
    .withMessage({
      code: AppErrorCode.IsRequired,
      title: 'Field is required',
      detail: 'Category id is required'
    })

    .isInt({ gt: 0 })
    .withMessage({
      code: AppErrorCode.InvalidType,
      title: 'Invalid field type',
      detail: 'Category id must be an (Integer)'
    })
];
