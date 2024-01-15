const request = require('supertest')
const express = require('express')



describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = express();

    app.get('/hello', (req, res) => {
      res.status(200).json({name: "nico"})
    });
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
