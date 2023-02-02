import app from '../src/index';
import supertest from 'supertest';

describe("POST /fruits", () => {
    it("given a valid fruit it should return 201", async () => {
        const body = {
          "name": "Apple",
          "price": 2000
        };

        const result = await supertest(app).post("/fruits").send(body);
        const status = result.status;
        
        expect(status).toEqual(201);
    });
    it("should respond with status 409 when there is a fruit with given name", async () => {
      const body = {
        "name": "Apple",
        "price": 2000
      };

      const result = await supertest(app).post("/fruits").send(body);
      const status = result.status;
        
      expect(status).toEqual(409);
    });
});

describe("GET /fruits", () => {
  it("should respond with status 200 and data if there is a fruit", async () => {
    const response = await supertest(app).get("/fruits");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number)
        })]),);
  });
});

describe("GET /fruits/id", () => {
  it("should respond with status 200 and data if there is a fruit", async () => {
    const response = await supertest(app).get("/fruits/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number)
        }),);
  });
  it("should respond with status 404 when there is no fruit", async () => {
    const response = await supertest(app).get("/fruits/0");

    expect(response.status).toBe(404);
  });
});