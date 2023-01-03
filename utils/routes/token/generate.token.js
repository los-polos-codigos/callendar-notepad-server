import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
//MESSAGE: userId is phone number
export const accessToken = (userId) => {
  return jwt.sign(
    {
      userId: userId,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "15m" }
  );
};

export const refreshToken = (userId) => {
  return jwt.sign(
    {
      userId: userId,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "15d" }
  );
};
