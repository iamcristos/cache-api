import { validationResult } from 'express-validator';
import DepartmentValidation from './department.validation';
import { UNPROCESSED_ENTITY } from '../util/httpStatusCode';

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(UNPROCESSED_ENTITY).json({
    errors: extractedErrors,
  });
}

const validation = {
  validate, DepartmentValidation,
};

export default validation;
