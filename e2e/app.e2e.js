const request = require('supertest')
// const express = require('express')
const createApp = require('../src/app.js');
const { config } = require('../src/config/config.js');


describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(8000)
    api = request(app)
  });

  test('GET /hello', async () => {
  const response = await api.get('/hello');
  expect(response).toBeTruthy();
  expect(response.statusCode).toEqual(200);
  expect(response.body.name).toEqual("nico");
  expect(response.headers['content-type']).toMatch(/json/);
  });

  describe('GET /nueva-rut', () => {
    test('should return 401', async () => {
      const {statusCode } = await api.get('/nueva-ruta');
      expect(statusCode).toEqual(401);

      });

    test('should return 200', async () => {
      const {statusCode } = await api.get('/nueva-ruta').set({ api: config.apiKey});
      expect(statusCode).toEqual(200);

      });
    test('should return 401 invalid APIKey', async () => {
      const {statusCode } = await api.get('/nueva-ruta').set({ api: '2000'});
      expect(statusCode).toEqual(401);

      });
  });


  afterAll(() => {
    server.close()
  });
});
