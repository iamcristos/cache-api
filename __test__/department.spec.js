/* eslint-disable no-underscore-dangle */
import server from './index';
import help from './db.helper';

describe('api/v1/department test', () => {
  let id;
  beforeAll(async (done) => {
    await help.connectDb();
    const department = await help.createDepartment();
    id = department._id;
    return done();
  });

  afterAll(async (done) => {
    await help.cleanDB();
    await help.disconnectDb();
    return done();
  });

  it('should create a department', () => {
    const body = {
      departmentInfo: {
        name: 'vincent',
        apiKey: 'dhhdsdhddBSCUDSIDSOODJDJJ',
        something: 'test',
      },
      departmentContactPerson: {
        name: 'vincent',
        email: 'vincent@gmail.com',
        telephone: '0809',
        add: 'for test purpose',
      },
    };
    return server().post('/api/v1/department').send(body)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toBeTruthy();
      });
  });

  test('should return 400 while registering without email', async (done) => {
    const body = {
      departmentInfo: {
        name: 'vincent',
        apiKey: 'dhhdsdhddBSCUDSIDSOODJDJJ',
        something: 'test',
      },
      departmentContactPerson: {
        name: 'vincent',
        telephone: '0809',
        add: 'for test purpose',
      },
    };
    const response = await server().post('/api/v1/department').send(body);
    expect(response.status).toBe(422);
    expect(response.body.errors).toBeTruthy();
    return done();
  });

  test('should return 422 while registering with empty body', async (done) => {
    const response = await server().post('/api/v1/department').send({});
    expect(response.status).toBe(422);
    return done();
  });

  test('should get all department succesfully ', async (done) => {
    const response = await server().get('/api/v1/department');
    expect(response.status).toBe(200);
    return done();
  });

  test('should return a department', async () => {
    const response = await server().get(`/api/v1/department/${id}`);
    expect(response.status).toBe(200);
  });

  test('should return a 422', async () => {
    const response = await server().get(`/api/v1/department/${undefined}`);
    expect(response.status).toBe(422);
  });

  test('should return a update department', async () => {
    const body = {
      departmentInfo: {
        name: 'vincent N',
      },
    };
    const response = await server().patch(`/api/v1/department/${id}`).send(body);
    expect(response.status).toBe(200);
    expect(response.body.body.name).toBe('vincent N');
  });

  test('should not return any department', async () => {
    const response = await server().get('/api/v1/department/search?search=v12');
    expect(response.status).toBe(200);
    expect(response.body.body.length).toBe(0);
  });

  test('should return a department', async () => {
    const response = await server().delete(`/api/v1/department/${id}`);
    expect(response.status).toBe(200);
  });
});
