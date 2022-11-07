import { Encryption, Decryption } from "./crypto";
import { mock_array, mock_object, mock_string } from "./mock.js";
import { expect, test } from "@jest/globals";

test("Returns encrypted value", () => {
  expect(Encryption(mock_array)).not.toEqual(mock_array);
  expect(Encryption(mock_object)).not.toEqual(mock_object);
  expect(Encryption(mock_string)).not.toEqual(mock_string);
});

test("Returns decrypted value", () => {
  expect(Decryption(Encryption(mock_array))).toEqual(mock_array);
  expect(Decryption(Encryption(mock_object))).toEqual(mock_object);
  expect(Decryption(Encryption(mock_string))).toEqual(mock_string);
});
