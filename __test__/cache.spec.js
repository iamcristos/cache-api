/* eslint-disable no-underscore-dangle */
import server from './index';
import help from './db.helper';

describe('api/v1/cache test', () => {
  beforeAll(async (done) => {
    await help.connectDb();
    await help.createKey();
    return done();
  });

  afterAll(async (done) => {
    await help.cleanDB();
    await help.disconnectDb();
    return done();
  });

  it('should create a key', () => {
    const body = {
      key: 'new key',
      value: "{test: 'true'}",
    };
    return server().post('/api/v1/cache').send(body)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toBeTruthy();
        expect(response.body.body.key).toBe(body.key);
      });
  });

  it('should update a key', () => {
    const body = {
      key: 'new key',
      value: "{update: 'true',}",
    };
    return server().post('/api/v1/cache').send(body)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toBeTruthy();
        expect(response.body.body.value).toBe(body.value);
      });
  });

  it('should return all stored keys', () => server().get('/api/v1/cache')
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.body.length).toBe(2);
    }));

  it('should delete all keys', () => server().get('/api/v1/cache')
    .then((response) => {
      expect(response.status).toBe(200);
    }));
});

describe('api/v1/cache test', () => {
  let key;
  beforeAll(async (done) => {
    await help.connectDb();
    const createkey = await help.createKey();
    key = createkey.key;
    return done();
  });

  afterAll(async (done) => {
    await help.cleanDB();
    await help.disconnectDb();
    return done();
  });

  it('should get a key', () => server().get(`/api/v1/caches/${key}`)
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.value).toBe(help.payload.value);
    }));

  it('should update cache with random string', () => server().get(`/api/v1/caches/${key}sing`)
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.body).not.toBe(help.payload.value);
      expect(typeof response.body.body).toBe('string');
    }));

  it('should delete a key', () => server().delete(`/api/v1/caches/${key}`)
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
    }));
});
