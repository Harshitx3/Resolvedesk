const { body, param, query, validationResult } = require('express-validator');

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

const createCustomerValidation = [
  body('companyId')
    .trim()
    .notEmpty()
    .withMessage('companyId is required')
    .isLength({ min: 1 })
    .withMessage('companyId cannot be empty'),

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 150 })
    .withMessage('Name must be between 2 and 150 characters'),

  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+\d][\d\s\-()]{5,}$/)
    .withMessage('Please provide a valid phone number'),

  validate,
];

const updateCustomerValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage('Name must be between 2 and 150 characters'),

  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+\d][\d\s\-()]{5,}$/)
    .withMessage('Please provide a valid phone number'),

  validate,
];

const idParamValidation = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Customer ID is required'),

  validate,
];

const byEmailValidation = [
  query('companyId')
    .trim()
    .notEmpty()
    .withMessage('companyId query parameter is required'),

  query('email')
    .trim()
    .notEmpty()
    .withMessage('email query parameter is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  validate,
];

module.exports = {
  createCustomerValidation,
  updateCustomerValidation,
  idParamValidation,
  byEmailValidation,
};
