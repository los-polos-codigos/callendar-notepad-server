import express from "express";

const router = express.Router();

router.post("/refresh", (req, res) => {});

export default router;

// import { Jwt } from "jsonwebtoken";
// import { config } from "dotenv";
// import { accessToken, refreshToken } from "./generate.jwt.js";

// config();

// export const refreshTokens = (userId) => {
//   return Jwt.verify(refreshToken(userId), process.env.SECRET_TOKEN, (err, decoded) => {
//     if (err) {
//       return console.log("error");
//     } else {
//       console.log("is veryfied");
//       console.log(decoded);

//       accessToken(userId);
//       refreshToken(userId);

//       // zwraca nowy accessToken i nowyRefreshToken
//     }
//   });
// };
