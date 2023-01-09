import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { server } from "./src/utils/functions/server/server.js";
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

import databaseRoute from "./src/routes/database.js";
import authPhoneRoute from "./src/routes/auth/phone.js";
import authCodeRoute from "./src/routes/auth/code.js";
import setDataRoute from "./src/routes/setData.js";
import verifyTokenRoute from "./src/routes/token/verify.token.js";
import refreshTokenRoute from "./src/routes/token/refresh.token.js";
import { checkDatabase } from "./src/utils/middleware/checkDatabase.js";

app.use(checkDatabase);

app.use("/database", databaseRoute);
//Database

app.use("/auth", authPhoneRoute);
app.use("/auth", authCodeRoute);
//Authentication

app.use("/token", verifyTokenRoute);
app.use("/token", refreshTokenRoute);
//Tokens

app.use("/setData", setDataRoute);
//Others

/////////////////////////////////////////////////////////////////

export { app };
