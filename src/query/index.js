import model from '../model';
import ContactPerson from './contactPerson.query';
import DepartmentQuery from './department.query';

const Query = () => ({
  department: new DepartmentQuery(model.Department),
  contactPerson: new ContactPerson(model.ContactPerson),
});

export default Query;
