import CommonQuery from './common.query';

class DepartmentQuery extends CommonQuery {
  constructor(model) {
    super(model);
    this.model = model;
  }

  search(value) {
    return this.getMany({ $text: { $search: value } }).populate('contactPerson');
  }
}

export default DepartmentQuery;
