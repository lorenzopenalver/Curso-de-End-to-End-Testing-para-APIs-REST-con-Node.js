const request = require('supertest')
// const express = require('express')
const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js');
const { upSeed, downSeed } = require('./utils/seed.js');


describe('test for /profile path', () => {
  let app = null;
  let server = null;
  let api = null;
  let accessToken = null
  beforeAll(async () => {
    app = createApp();
    server = app.listen(8000)
    api = request(app)
    await upSeed()
  });

  describe('GET /my-user', () => {
    beforeAll(async ()=> {
      const user = await models.User.findByPk('1')
      const inputData = {
        email: user.email,
        password: 'admin123'
      }
      const { body: loginBody } = await api.post('/api/v1/auth/login').send(inputData)
      accessToken = loginBody.access_token
    })


    test('should return 200', async () => {
      const user = await models.User.findByPk('1')
      const { statusCode, body } = await api.get(`/api/v1/profile/my-user`).set({
        'Authorization': `Bearer ${accessToken}`
      })
      expect(statusCode).toEqual(200)
      expect(body.email).toEqual(user.email)

    });

    test('should return 401 invalid access token', async () => {

      const { statusCode } = await api.get(`/api/v1/profile/my-user`).set({
        'Authorization': `Bearer 23312`
      })
      expect(statusCode).toEqual(401)
    });

    afterAll(() => {
      accessToken = null
    })

  });

  describe('GET /my-orders', () => {
    test('should return 401 invalid access token', async () => {

      const { statusCode } = await api.get(`/api/v1/profile/my-orders`).set({
        'Authorization': `Bearer 23312`
      })
      expect(statusCode).toEqual(401)
    });

  });



  afterAll(async () => {
    await downSeed()
    server.close()
  });
});
