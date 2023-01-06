import express from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { generateAccessToken, generateRefreshToken } from "./generate.token.js";

config();
const router = express.Router();

router.post("/refresh", (req, res) => {
  const received_token = req.body.refreshToken;

  jwt.verify(received_token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err || !decoded.isRefreshToken) {
      res.status(403);
      res.end();
    } else {
      res.status(200);
      res.send(
        JSON.parse(
          JSON.stringify({
            accessToken: generateAccessToken(decoded.userId),
            refreshToken: generateRefreshToken(decoded.userId),
          })
        )
      );
      res.end();
    }
  });
});

export default router;
