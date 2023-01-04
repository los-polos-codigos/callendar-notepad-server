import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

// TODO: no a własnie nie powinno byc numerem telefonu
//MESSAGE: userId is phone number
export const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      userId: userId,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    {
      userId: userId,
      isRefreshToken: true,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "15d" }
  );
};
