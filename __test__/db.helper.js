/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import model from '../src/model';
import db from '../src/config/db.config';

class DbtestHelper {
  static connectDb() {
    return db();
  }

  static async cleanDB() {
    // drop all database;
    const promiseArray = [model.Department.deleteMany({}),
      model.ContactPerson.deleteMany({})];
    const cleandb = await Promise.all(promiseArray);
    return cleandb;
  }

  static async createDepartment() {
    const body = {
      name: 'vincent',
      apiKey: 'dhhdsdhddBSCUDSIDSOODJDJJ',
      something: 'test',
    };
    const department = await model.Department.create(body);
    return department;
  }

  static disconnectDb() {
    return mongoose.disconnect();
  }
}

export default DbtestHelper;
