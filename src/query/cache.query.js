import CommonQuery from './common.query';

class Cache extends CommonQuery {
  constructor(model) {
    super(model);
    this.model = model;
  }

  getCacheSize() {
    return this.model.count({});
  }

  getOldestCache() {
    return this.model.findOne({}, {}, { sort: { updatedAt: 1 } });
  }

  getAll() {
    return this.model.find({}).select('key -_id');
  }
}

export default Cache;
