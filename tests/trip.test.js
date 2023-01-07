const request = require("supertest");
const app = require("../app");

describe("Test /trips", () => {
  test("Missing 'offset' query param returns 400 ", done => {
    request(app)
      .get("/trips")
      .query({ limit: 10 })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test("Missing 'limit' query param returns 400", done => {
    request(app)
      .get("/trips")
      .query({ offset: 10 })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test("Missing both 'limit' and 'offset' query param returns 400", done => {
    request(app)
      .get("/trips")
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test("Proper request returns 200", done => {
    request(app)
      .get("/trips")
      .query({ offset: 10, limit: 10 })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response).toBe(10);
        done();
      });
  });
});