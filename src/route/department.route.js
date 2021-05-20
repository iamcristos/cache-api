import express from 'express';
import Controller from '../controller/department.controller';
import checkError from '../util/errorHandler';
import validation from '../validation';

const router = express.Router();

router.route('/department')
  .post(
    [validation.DepartmentValidation.createDepartment(), validation.validate],
    checkError(Controller.createDepartment),
  )
  .get(checkError(Controller.getAllDepartment));

router.get('/department/search', checkError(Controller.searchDepartment));

router.route('/department/:id')
  .patch(
    [validation.DepartmentValidation.validateIds(), validation.validate],
    checkError(Controller.updateDepartment),
  )
  .get(
    [validation.DepartmentValidation.validateIds(), validation.validate],
    checkError(Controller.getADepartment),
  )
  .delete(
    [validation.DepartmentValidation.validateIds(), validation.validate],
    checkError(Controller.deleteDepartment),
  );

export default router;
