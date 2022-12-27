import { expect, test } from "@jest/globals";
import request from "supertest";
import { app } from "../../app.js";

describe("SMS tests", () => {
  it("/auth/phone", async () => {
    try {
      const response = await request(app).post("/auth/phone");
      expect(response.status).toBe(200);
      expect(response.text).toBe("OK");
    } catch (err) {
      throw err;
    }
  });
});
