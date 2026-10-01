const { body, validationResult } = require('express-validator');
const config = require('../config/env');

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

const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Za-z]/)
    .withMessage('Password must contain at least one letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),

  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(config.publicRegistrableRoles)
    .withMessage(
      `Invalid role. Allowed roles: ${config.publicRegistrableRoles.join(', ')}`
    ),

  body('companyId')
    .trim()
    .notEmpty()
    .withMessage('Company ID is required')
    .isLength({ min: 1 })
    .withMessage('Company ID cannot be empty'),

  validate,
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  validate,
];

module.exports = {
  registerValidation,
  loginValidation,
};
