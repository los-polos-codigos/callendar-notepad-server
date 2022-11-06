import { Encryption, Decryption } from "./crypto";
import { mock_array, mock_object, mock_string } from "./mock.js";

test("Encrypt values", () => {
  expect(Encryption(mock_array));
});

// export const CryptoTest = (value) => {
//   Encryption();
//   if (value === "Encryption" && JSON.stringify(converted_mock) !== JSON.stringify(mock)) return "working";
//   Decryption();
//   if (value === "Decryption" && JSON.stringify(converted_mock) === JSON.stringify(mock)) return "working";
//   return false;
// };
