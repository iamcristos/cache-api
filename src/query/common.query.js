class CommonQuery {
  constructor(model) {
    this.model = model;
  }

  getOne(item) {
    return this.model.findOne(item);
  }

  getMany(item) {
    return this.model.find(item);
  }

  getAll() {
    return this.model.find();
  }

  updateById(id, update) {
    return this.model.findByIdAndUpdate(id, update, { new: true }).lean();
  }

  getById(id) {
    return this.model.findById(id);
  }

  addDoc(item) {
    return this.model.create(item);
  }

  getPopulate(id, ref) {
    return this.getById(id).populate(ref).exec();
  }

  getAllPopopulate(ref) {
    return this.getAll().populate(ref).exec();
  }

  findOneAndUpdate(condition, update) {
    return this.model.findOneAndUpdate(condition, { $set: update }, { new: true });
  }

  removeDoc(condition) {
    return this.model.findOneAndDelete(condition);
  }

  deleteAllDoc() {
    return this.model.deleteMany();
  }
}

export default CommonQuery;
