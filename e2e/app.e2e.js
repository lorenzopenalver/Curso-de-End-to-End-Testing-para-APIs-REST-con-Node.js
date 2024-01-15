const request = require('supertest')
// const express = require('express')
const createApp = require('../src/app.js')


describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
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

  afterEach(() => {
    server.close()
  });
});
