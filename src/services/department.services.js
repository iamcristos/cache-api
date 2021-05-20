/* eslint-disable max-len */
/* eslint-disable no-async-promise-executor */
import Query from '../query/index';
import ResponseFormat from '../util/responseFormatter';
import { NOT_FOUND } from '../util/httpStatusCode';

class DepartmentService {
  static getAlldepartments() {
    return new Promise((resolve, reject) => {
      try {
        const data = Query().department.getAllPopopulate('contactPerson');
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static getSingleDepartment(res, { params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = params;
        const data = await Query().department.getPopulate(id, 'contactPerson');
        if (!data) {
          return ResponseFormat.error(res, new Error('department not found'), NOT_FOUND);
        }
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static create({ body }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { departmentContactPerson, departmentInfo } = body;
        const contactPerson = await DepartmentService.getContactPerson(departmentContactPerson);
        const data = await Query().department.addDoc({ ...departmentInfo, contactPerson });
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static update({ body, params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { departmentContactPerson, departmentInfo } = body;
        const { id } = params;
        const data = await Query().department.updateById(id, { ...departmentInfo });
        const contactPerson = await DepartmentService.updateContactPerson(departmentContactPerson, data.contactPerson);
        return resolve({ ...data, contactPerson });
      } catch (error) {
        return reject(error);
      }
    });
  }

  static delete(res, { params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = params;
        const data = await Query().department.removeDoc(id);
        if (!data) {
          return ResponseFormat.error(res, new Error('department not found'), NOT_FOUND);
        }
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static async getContactPerson(item) {
    const contectPerson = await Query().contactPerson.getOne({ email: item.email }).exec();
    if (contectPerson) {
      return contectPerson.id;
    }
    const saveContactPerson = await Query().contactPerson.addDoc(item);
    return saveContactPerson.id;
  }

  static async updateContactPerson(item, id) {
    const contectPerson = await Query().contactPerson.updateById(id, item);
    return contectPerson;
  }

  static async searchDepartment({ query }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { search } = query;
        const data = await Query().department.search(search);
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

export default DepartmentService;
