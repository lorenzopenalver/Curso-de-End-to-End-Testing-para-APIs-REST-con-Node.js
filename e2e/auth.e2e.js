const request = require('supertest')
// const express = require('express')
const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js');
const { upSeed, downSeed } = require('./utils/seed.js');



describe('test for /auth path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(8000)
    api = request(app)
    await upSeed()
  });

  describe('POST /login', () => {
    test('should return a 401', async () => {
      const inputData = {
        email: 'emaifake@mail.com',
        password: 'juan284729'
      }
      const { statusCode} = await api.post('/api/v1/auth/login').send(inputData)
      expect(statusCode).toBe(401);
    });

    test('should return a 200', async () => {
      const user = await models.User.findByPk('1')
      const inputData = {
        email: user.email,
        password: 'admin123'
      }
      const { statusCode, body} = await api.post('/api/v1/auth/login').send(inputData)
      expect(statusCode).toBe(200);
      expect(body.access_token).toBeTruthy();
      expect(body.user.email).toEqual(user.email);
      expect(body.user.password).toBeUndefined();
    });



  afterAll(async () => {
    await downSeed
    server.close()
  });
});

})
