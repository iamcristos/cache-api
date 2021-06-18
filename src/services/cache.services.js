/* eslint-disable max-len */
/* eslint-disable no-async-promise-executor */
import { merge } from 'lodash';
import logger from 'pino';

import Query from '../query/index';
import { getTTL, randomString } from '../util/cacheUtil';

class CacheService {
  static getByKey({ key }) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Query().cache.getOne({ key });
        if (!data) {
          logger().info('Cache miss');
          console.log('Cache miss');
          const value = randomString();
          await Query().cache.addDoc({ key, value });
          return resolve(value);
        }
        logger().info('Cache hit');
        console.log('Cache hit');
        data = await CacheService.validateTTL(data);
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static getAllKeys() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Query().cache.getAll();
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static createKey({ key, value }) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Query().cache.getOne({ key });
        if (!data) {
          const cacheItem = await CacheService.addCache({ key, value });
          return resolve(cacheItem);
        }
        const updateValue = await Query().cache.updateById(data.id, { value });
        return resolve(updateValue);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static removeKey({ key }) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Query().cache.removeDoc({ key });
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static removeAllKeys() {
    return new Promise(async (resolve, reject) => {
      try {
        await Query().cache.deleteAllDoc();
        return resolve('all keys deleted');
      } catch (error) {
        return reject(error);
      }
    });
  }

  static resizeCache({ key, value }) {
    return new Promise(async (resolve, reject) => {
      try {
        //   find the oldest item in the cache
        const oldestItem = await Query().cache.getOldestCache();
        // update with the new item
        merge(oldestItem, { key, value });
        // save
        oldestItem.save();
        return resolve(oldestItem);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static addCache({ key, value }) {
    return new Promise(async (resolve, reject) => {
      try {
        // get the total item in the cache
        const cacheSize = await Query().cache.getCacheSize();
        const cacheLimit = process.env.CACHE_LIMIT || 100;
        // check if the limit of the cache is reached and update the oldest Item
        if (cacheSize >= cacheLimit) {
          const resize = await CacheService.resizeCache({ key, value });
          return resolve(resize);
        }
        const newEntry = await Query().cache.addDoc({ key, value });
        return resolve(newEntry);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static validateTTL(data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!getTTL(data.updatedAt)) {
          const value = randomString();
          merge(data, { value });
        }
        data.save();
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

export default CacheService;
