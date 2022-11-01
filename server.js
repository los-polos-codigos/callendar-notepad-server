import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import { server } from "./database";
import { server } from "./database.js";

//Config
const app = express();
const PORT = 2137;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Methods
app.get("/", async (req, res) => {
  res.send("Server works");
  await server();
});

//Listen
app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});
