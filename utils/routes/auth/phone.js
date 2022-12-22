import express from "express";
//
import { body } from "../../../mock/phone_mock.js";
//
const router = express.Router();

router.post("/phone", async (req, res) => {
  res.send(body);
  console.log(body);
});

export default router;
