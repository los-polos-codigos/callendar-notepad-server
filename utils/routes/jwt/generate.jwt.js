import express from "express";

const router = express.Router();

router.post("/generate", (req, res) => {});

export default router;

// import { Jwt } from "jsonwebtoken";
// import { config } from "dotenv";

// config();

// export const accessToken = (userId) => {
//   return Jwt.sign(
//     {
//       userId: userId,
//     },
//     process.env.SECRET_TOKEN,
//     { expiresIn: "15m" }
//   );
// };

// export const refreshToken = (userId) => {
//   return Jwt.sign(
//     {
//       userId: userId,
//     },
//     process.env.SECRET_TOKEN,
//     { algorithm: "RS256", expiresIn: "15d" }
//   );
// };
