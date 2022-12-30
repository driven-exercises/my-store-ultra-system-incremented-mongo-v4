import request from "../utils/request";
import { _setup, end, setEnv } from "../utils/serverRunner";
import sleep from "../utils/sleep";
import fs from "fs";

jest.setTimeout(15000);

beforeAll(async () => {
  setEnv("MONGO_URI", "mongodb://mongo_db:27017");
  await sleep(4000);
})

afterAll(() => {
  end();
});

describe("GET /customers", () => {
  it("should respond with an empty array", async () => {
    await _setup();

    const response = await request.get("/customers");

    expect(response.data).toEqual([]);
  });

  it("should responde with status 404", async () => {
    await _setup();

    const nonExistingId = "non-existing";

    const response = await request.get(`/customers/${nonExistingId}`);

    expect(response.status).toBe(404);
  });

  it("should create a new customer", async () => {
    await _setup();

    const response = await request.post("/customers", {
      name: "Fulano",
      email: "fulano@gmail.com"
    });

    expect(response.status).toEqual(201);
  });

  it("should respond with the complete list of customers", async () => {
    await _setup();

    const response = await request.get("/customers");

    expect(response.data).toEqual([{
      _id: expect.any(String),
      name: "Fulano",
      email: "fulano@gmail.com"
    }]);
  });

  it("should respond with given customer", async () => {
    await _setup();

    const customerId = (await request.get("/customers")).data[0]._id;
    const response = await request.get(`/customers/${customerId}`);

    expect(response.data).toEqual({
      _id: customerId,
      name: "Fulano",
      email: "fulano@gmail.com"
    });
  });
});

describe("GET /products", () => {
  it("should respond with an empty array", async () => {
    await _setup();

    const response = await request.get("/products");

    expect(response.data).toEqual([]);
  });

  it("should responde with status 404", async () => {
    await _setup();

    const nonExistingId = "non-existing";

    const response = await request.get(`/products/${nonExistingId}`);

    expect(response.status).toBe(404);
  });

  it("should create a new customer", async () => {
    await _setup();

    const response = await request.post("/products", {
      name: "Televisão",
      sku: 2,
      price: 240000
    });

    expect(response.status).toEqual(201);
  });

  it("should respond with the complete list of products", async () => {
    await _setup();

    const response = await request.get("/products");

    expect(response.data).toEqual([{
      _id: expect.any(String),
      name: "Televisão",
      sku: 2,
      price: 240000
    }]);
  });

  it("should respond with given customer", async () => {
    await _setup();

    const productId = (await request.get("/products")).data[0]._id;
    const response = await request.get(`/products/${productId}`);

    expect(response.data).toEqual({
      _id: productId,
      name: "Televisão",
      sku: 2,
      price: 240000
    });
  });
});

describe("Usage of Async/Await", () => {
  it("should be used async/await with try/catch instead of .then() and .catch()", async () => {
    const code = fs.readFileSync("./src/app.js", "utf8");

    expect(code.indexOf("async")).toBeGreaterThan(-1);
    expect(code.indexOf("await")).toBeGreaterThan(-1);
    expect(code.indexOf("try")).toBeGreaterThan(-1);
    expect(code.indexOf("catch")).toBeGreaterThan(-1);

    expect(code.indexOf(".then(product")).toBe(-1);
    expect(code.indexOf(".catch(")).toBe(-1);
  });
});
