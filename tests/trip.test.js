const app = require("../app");
const supertest = require('supertest')
const api = supertest(app)
const { db } = require('../utils/db')

afterAll(() => {
  db.end()
})

describe("Test /trips", () => {
  test("Missing 'offset' query param returns 400 ", async () => {
    const response = await api.get('/trips?limit=10')

    expect(response.statusCode).toBe(400)
  });

  test("Missing 'limit' query param returns 400", async () => {
    const response = await api.get('/trips?offset=10')

    expect(response.statusCode).toBe(400)
  });

  test("Missing both 'limit' and 'offset' query param returns 400", async () => {
    const response = await api.get('/trips')

    expect(response.statusCode).toBe(400)
  });

  test("Proper request returns 200 and right amount of lines", async () => {
    const response = await api.get('/trips?offset=10&limit=10')

    const resLength = JSON.parse(response.text)?.length

    expect(response.statusCode).toBe(200)
    expect(resLength).toBe(10)
  });
});