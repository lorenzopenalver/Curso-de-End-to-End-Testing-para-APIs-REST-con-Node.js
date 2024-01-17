const request = require('supertest')
// const express = require('express')
const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js');


describe('test for /users path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(8000)
    api = request(app)
  });

  describe('GET /users/{id}', () => {
    test('should return a user', async () => {
      const user = await models.User.findByPk('1')
      // const inputId = '1'
      const { statusCode, body } = await api.get(`/api/v1/users/${user.id}`)
      expect(statusCode).toEqual(200)
      expect(body.id).toEqual(user.id)
      expect(body.email).toEqual(user.email)

    });

  });

  describe('POST /users', () => {
    test('should return a 400 for email', async () => {
      const inputData = {
        email: '-------',
        password: 'juan284729'
      }
      const { statusCode , body} = await api.post('/api/v1/users').send(inputData)
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/email/);

    });
  describe('POST /users', () => {
    test('should return a 400 for password', async () => {
      const inputData = {
        email: 'admin@mail.com',
        password: '------'
      }
      const { statusCode , body} = await api.post('/api/v1/users').send(inputData)
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/password/);

    });
  });

  describe('PUT /users', () => {
    // Test for get users
  });

  afterAll(() => {
    server.close()
  });
});

})
