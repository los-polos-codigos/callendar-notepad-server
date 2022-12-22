import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { server } from "./utils/functions/database/database.js";
config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "test") server();

app.get("/app/health", async (req, res) => {
  res.status(200);
  res.send("OK");
});

/////////////////////////////////////////////////////////////////

//Here is communication with app routes

import databaseRoute from "./utils/routes/database.js";
import authPhoneRoute from "./utils/routes/auth/phone.js";
import authCodeRoute from "./utils/routes/auth/code.js";
import setDataRoute from "./utils/routes/setData.js";

app.use("/database", databaseRoute);
//Database

app.use("/auth", authPhoneRoute);
app.use("/auth", authCodeRoute);
//Authentication

app.use("/setData", setDataRoute);
//Others

/////////////////////////////////////////////////////////////////

export { app };
