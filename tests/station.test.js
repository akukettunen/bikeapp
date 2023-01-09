const app = require("../app");
const supertest = require('supertest')
const api = supertest(app)
const { db } = require('../utils/db')

afterAll(() => {
  db.end()
})

describe("Test /stations", () => {
  test("Missing 'offset' query param returns 400 ", async () => {
    const response = await api.get('/stations?limit=10')

    expect(response.statusCode).toBe(400)
  });

  test("Missing 'limit' query param returns 400", async () => {
    const response = await api.get('/stations?offset=10')

    expect(response.statusCode).toBe(400)
  });

  test("Missing both 'limit' and 'offset' query param returns 400", async () => {
    const response = await api.get('/stations')

    expect(response.statusCode).toBe(400)
  });

  test("Proper request returns 200 and right amount of lines", async () => {
    const response = await api.get('/stations?offset=2&limit=2')

    const resLength = JSON.parse(response.text)?.length
    
    expect(response.statusCode).toBe(200)
    expect(resLength).toBe(2)
  });
});

describe("Test /stations/:id", () => {
  test("Returns 200", async () => {
    const response = await api.get('/stations/2')

    expect(response.statusCode).toBe(200)
  });
});