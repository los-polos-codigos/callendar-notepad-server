import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app.js";

describe("Base tests", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/test-database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("/app/health", async () => {
    try {
      const response = await request(app).get("/app/health");
      expect(response.status).toBe(200);
      expect(response.text).toBe("OK");
    } catch (err) {
      throw err;
    }
  });

  it("/database/health", async () => {
    try {
      const response = await request(app).get("/database/health");
      expect(response.status).toBe(200);
      expect(response.text).toBe("working");
    } catch (err) {
      throw err;
    }
  });
});
