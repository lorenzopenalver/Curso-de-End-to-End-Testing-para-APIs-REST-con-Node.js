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
    test('should return 2 products with limit 2 and offset 0', async () => {
      const limit = 2;
      const offset = 0;
      const { statusCode, body } = await api.get(`/api/v1/products?limit=${limit}&offset=${offset}`)
      expect(statusCode).toEqual(200)
      expect(body.length).toEqual(2)

    });
    test('should return 2 products with limit 2 and offset 2', async () => {
      const limit = 2;
      const offset = 2;
      const { statusCode, body } = await api.get(`/api/v1/products?limit=${limit}&offset=${offset}`)
      expect(statusCode).toEqual(200)
      expect(body.length).toEqual(2)

    });

  });

  afterAll(async () => {
    await downSeed()
    server.close()
  });

})
