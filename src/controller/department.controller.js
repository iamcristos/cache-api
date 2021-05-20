import Controller from './base';
import DepartmentService from '../services/department.services';

class Department extends Controller {
  static async createDepartment(req, res) {
    const data = await DepartmentService.create(req);
    return Department.created(data, res);
  }

  static async updateDepartment(req, res) {
    const data = await DepartmentService.update(req);
    return Department.success(data, res);
  }

  static async getADepartment(req, res) {
    const data = await DepartmentService.getSingleDepartment(res, req);
    return Department.success(data, res);
  }

  static async getAllDepartment(req, res) {
    const data = await DepartmentService.getAlldepartments();
    return Department.success(data, res);
  }

  static async deleteDepartment(req, res) {
    const data = await DepartmentService.delete(res, req);
    return Department.success(data, res);
  }

  static async searchDepartment(req, res) {
    const data = await DepartmentService.searchDepartment(req);
    return Department.success(data, res);
  }
}

export default Department;
