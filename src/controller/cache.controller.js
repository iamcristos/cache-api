import Controller from './base';
import CacheService from '../services/cache.services';

class Cache extends Controller {
  static async getByKey(req, res) {
    const data = await CacheService.getByKey(req.params);
    return Cache.success(data, res);
  }

  static async getAllKeys(req, res) {
    const data = await CacheService.getAllKeys();
    return Cache.success(data, res);
  }

  static async createKey(req, res) {
    const data = await CacheService.createKey(req.body);
    return Cache.created(data, res);
  }

  static async removeKey(req, res) {
    const data = await CacheService.removeKey(req.params);
    return Cache.success(data, res);
  }

  static async removeAllKeys(req, res) {
    const data = await CacheService.removeAllKeys();
    return Cache.success(data, res);
  }
}

export default Cache;
