import express from "express";

const router = express.Router();

router.post("/verify", (req, res) => {});

export default router;
// import { Jwt } from "jsonwebtoken";
// import { accessToken } from "./generate.jwt";
// import { config } from "dotenv";

// config();

// export const confirmToken = (userId) => {
//   Jwt.verify(accessToken(userId), process.env.SECRET_TOKEN, (err, decoded) => {
//     if (err) {
//       return console.log("error");
//     } else {
//       console.log("is veryfied");
//       console.log(decoded);
//     }
//   });
// };

//403 error
