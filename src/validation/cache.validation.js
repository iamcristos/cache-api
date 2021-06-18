import { body, param } from 'express-validator';

class CacheValidation {
  static createKey() {
    return [
      body('key').isString().withMessage('Key must be a string'),
      body('value').isString().withMessage('Kindly stringify values'),
    ];
  }

  static validateKey() {
    return [
      param('key').isString().withMessage('key is required'),
    ];
  }
}

export default CacheValidation;
