import CryptoJS from "crypto-js";
import { config } from "dotenv";
import { mock, converted_mock } from "./mock.js"; // here its test value for crypto

config();

const Encryption = () => {
  Object.keys(mock).map((obj) => {
    if (obj === "subscription") {
      converted_mock[obj] = mock[obj];
      return;
    }
    converted_mock[obj] = CryptoJS.Rabbit.encrypt(mock[obj], process.env.CRYPTO_KEY).toString();
  });
};

const Decryption = () => {
  Object.keys(converted_mock).map((obj) => {
    if (obj === "subscription") return;
    converted_mock[obj] = CryptoJS.enc.Utf8.stringify(
      CryptoJS.Rabbit.decrypt(converted_mock[obj], process.env.CRYPTO_KEY)
    );
  });
};

export const CryptoTest = (value) => {
  Encryption();
  if (value === "Encryption" && JSON.stringify(converted_mock) !== JSON.stringify(mock)) return "working";
  Decryption();
  if (value === "Decryption" && JSON.stringify(converted_mock) === JSON.stringify(mock)) return "working";
  return false;
};
