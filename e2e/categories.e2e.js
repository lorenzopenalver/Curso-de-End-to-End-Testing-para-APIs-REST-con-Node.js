const request = require('supertest')
// const express = require('express')
const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js');
const { upSeed, downSeed } = require('./utils/umzug.js');


describe('test for /categories path', () => {
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


  describe('POST /categories with admin user', () => {
    beforeAll(async () => {
      const user = await models.User.findByPk('1')
      const inputData = {
        email: user.email,
        password: 'admin123'
      }
      const { body: loginBody } = await api.post('/api/v1/auth/login').send(inputData)
      accessToken = loginBody.access_token
    })

    test('should return 401', async () => {
      const inputData = {
        email: 'categoria nueva2',
        image: "https://api.lorem.space/image/game?w=150&h=220",
      }
      const { statusCode } = await api.post('/api/v1/categories').send(inputData)
      expect(statusCode).toEqual(401);
    });

     test('should return a new category', async () => {
      const inputData = {
        name: 'Categoria nueva',
        image: 'https://api.lorem.space/image/game?w=150&h=220'
      }
      const { statusCode, body } = await api
        .post(`/api/v1/categories`)
        .set({'Authorization': `Bearer ${accessToken}`})
        .send(inputData);
      expect(statusCode).toEqual(201);

      const category = await models.Category.findByPk(body.id);
      expect(category.name).toEqual(inputData.name);
      expect(category.image).toEqual(inputData.image);
    });

    afterAll(() => {
      accessToken = null;
    })
  });
  describe('POST /categories without admin user', () => {
    beforeAll(async () => {
      const user = await models.User.findByPk('2')
      const inputData = {
        email: user.email,
        password: 'admin123'
      }
      const { body: loginBody } = await api.post('/api/v1/auth/login').send(inputData)
      accessToken = loginBody.access_token
    })

    test('should return 401 without token', async () => {
      const inputData = {
        email: 'categoria nueva2',
        image: "https://api.lorem.space/image/game?w=150&h=220",
      }
      const { statusCode } = await api.post('/api/v1/categories').send(inputData)
      expect(statusCode).toEqual(401);
    });

     test('should return 401 with token', async () => {
      const inputData = {
        name: 'Categoria nueva',
        image: 'https://api.lorem.space/image/game?w=150&h=220'
      }
      const { statusCode } = await api
        .post(`/api/v1/categories`)
        .set({'Authorization': `Bearer ${accessToken}`})
        .send(inputData);
      expect(statusCode).toEqual(401);
    });

    afterAll(() => {
      accessToken = null;
    })
  });

  afterAll(async () => {
    await downSeed()
    server.close()
  });

})
