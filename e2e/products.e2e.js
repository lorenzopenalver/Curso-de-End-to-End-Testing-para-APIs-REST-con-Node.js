const request = require('supertest')
// const express = require('express')
const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js');
const { upSeed, downSeed } = require('./utils/umzug.js');


describe('test for /products path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(8000)
    api = request(app)
    await upSeed()
  });

  describe('GET /products', () => {
    test('should return products', async () => {
      const products = await models.Product.findAll();
      const { statusCode, body } = await api.get(`/api/v1/products`)

      expect(statusCode).toEqual(200)
      expect(body.length).toEqual(products.length)
      expect(body[0].category).toBeTruthy();

    });

  });

  afterAll(async () => {
    await downSeed()
    server.close()
  });

})
