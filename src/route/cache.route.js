import express from 'express';
import Controller from '../controller/cache.controller';
import checkError from '../util/errorHandler';
import validation from '../validation';

const router = express.Router();

router.route('/cache')
  .post(
    [validation.CacheValidation.createKey(), validation.validate],
    checkError(Controller.createKey),
  )
  .get(checkError(Controller.getAllKeys))
  .delete(checkError(Controller.removeAllKeys));

router.route('/caches/:key')
  .get(
    [validation.CacheValidation.validateKey(), validation.validate],
    checkError(Controller.getByKey),
  )
  .delete(
    [validation.CacheValidation.validateKey(), validation.validate],
    checkError(Controller.removeKey),
  );

export default router;
