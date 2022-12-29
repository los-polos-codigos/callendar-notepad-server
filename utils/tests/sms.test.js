import { expect, test } from "@jest/globals";
import request from "supertest";
import { app } from "../../app.js";
import { variable } from "../variables/auth-phone.variable.js";

describe("SMS tests", () => {
  it("/auth/phone", async () => {
    try {
      const response = await request(app).post("/auth/phone");
      expect(response.status).toBe(200);
      expect(JSON.parse(response.text)).toStrictEqual(variable.slice(-1));
    } catch (err) {
      throw err;
    }
  });
});
