import express from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const router = express.Router();

router.post("/verify", (req, res) => {
  const received_token = req.headers.authorization.split(" ")[1];
  jwt.verify(received_token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      res.status(403);
      res.send("Token.02");
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

export default router;
