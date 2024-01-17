const request = require('supertest')
// const express = require('express')
const createApp = require('../src/app.js')


describe('test for /users path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = createApp();
    server = app.listen(8000)
    api = request(app)
  });

  describe('GET /users', () => {
    // Test for get users
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

  afterEach(() => {
    server.close()
  });
});

})
