import expressValidator from 'express-validator';
const { check, validationResult } = expressValidator;

export const validationRules = () => {
  return [
    // Email Validation
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Invalid Email')
      .notEmpty()
      .withMessage('Email can not be empty'),
    // Username Validation
    check('username')
      .notEmpty()
      .withMessage('Username can not be empty')
      .isLength({ min: 5, max: 15 })
      .withMessage('Username must be between 5 to 15 characters')
      .isAlphanumeric()
      .withMessage('Username can not container non-alphanumeric characters'),

    // Password Validation
    check('password')
      .notEmpty()
      .withMessage('Password can not be empty')
      .isStrongPassword()
      .withMessage(
        'Password must be at least 8 characters long with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol'
      ),

    // Birth date validation
    check('birthDate').notEmpty().withMessage('Date of birth can not be empty'),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
