import express from "express";
import { DatabaseTest } from "../functions/database/database.js";

const router = express.Router();

router.get("/health", async (req, res) => {
  const data = await DatabaseTest.find();
  res.status(200);
  res.send(data[0].type);
});

export default router;
