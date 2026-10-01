const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    const error = new Error('Validation failed');
    error.array = () => errors.array();
    return next(error);
  }
  next();
};

const createCompanyValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 150 })
    .withMessage('Company name must be between 2 and 150 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Company email is required')
    .isEmail()
    .withMessage('Please provide a valid company email')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage('Phone number must be between 5 and 30 characters'),

  body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please provide a valid website URL'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  validate,
];

const updateCompanyValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage('Company name must be between 2 and 150 characters'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid company email')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage('Phone number must be between 5 and 30 characters'),

  body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please provide a valid website URL'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('logo')
    .optional()
    .trim()
    .isURL()
    .withMessage('Logo must be a valid URL'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  validate,
];

const updateStatusValidation = [
  body('isActive')
    .notEmpty()
    .withMessage('isActive is required')
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  validate,
];

const idParamValidation = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Company ID is required'),

  validate,
];

const slugParamValidation = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Company slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Invalid slug format'),

  validate,
];

module.exports = {
  createCompanyValidation,
  updateCompanyValidation,
  updateStatusValidation,
  idParamValidation,
  slugParamValidation,
};
