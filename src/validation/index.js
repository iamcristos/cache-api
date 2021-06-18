import { validationResult } from 'express-validator';
import CacheValidation from './cache.validation';
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
  validate, CacheValidation,
};

export default validation;
