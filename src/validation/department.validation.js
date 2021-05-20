import { body, param } from 'express-validator';

class DepartmentValidation {
  static createDepartment() {
    return [
      body('departmentInfo').isObject().withMessage('departmentInfo is required and must be an object'),
      body('departmentContactPerson').isObject().withMessage('departmentContactPerson is required and must be an object'),
      body('departmentInfo.name').isString().withMessage('department name is required'),
      body('departmentInfo.apiKey').isString().withMessage('department apiKey is required'),
      body('departmentContactPerson.name').isString().withMessage('contact person name is required'),
      body('departmentContactPerson.email').isEmail().withMessage('contact person email is required'),
      body('departmentContactPerson.telephone').isString().withMessage('contact person telephone is required'),
    ];
  }

  static validateIds() {
    return [
      param('id').isMongoId().withMessage('department id is required'),
    ];
  }
}

export default DepartmentValidation;
