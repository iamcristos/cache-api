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
    const cleandb = await model.Cache.deleteMany({});
    return cleandb;
  }

  static async createKey() {
    const body = {
      key: 'testKey',
      value: '{name: faith, age: 1}',
    };
    const cacheKey = await model.Cache.create(body);
    return cacheKey;
  }

  static disconnectDb() {
    return mongoose.disconnect();
  }

  static payload() {
    return {
      key: 'testKey',
      value: '{name: faith, age: 1}',
    };
  }
}

export default DbtestHelper;
