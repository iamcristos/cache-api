import CommonQuery from './common.query';

class ContactPerson extends CommonQuery {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

export default ContactPerson;
