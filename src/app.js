import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { config } from "dotenv";
import { server, DatabaseTest } from "../database.js";
config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "test") server();

app.get("/app-health", async (req, res) => {
  res.status(200);
  res.send("OK");
});

app.get("/database-health", async (req, res) => {
  const data = await DatabaseTest.find();
  res.status(200);
  res.send(data[0].type);
});

export { app };
