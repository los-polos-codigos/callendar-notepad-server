import CryptoJS from "crypto-js";
import { config } from "dotenv";

config();

const is_custom = (custom_string) => {
  if (custom_string.toLowerCase() === "true" || custom_string.toLowerCase() === "false") return Boolean(custom_string);
  if (typeof parseInt(custom_string) === "number" && !isNaN(parseInt(custom_string))) return parseInt(custom_string);
  return custom_string;
};

const object_crypto = (object_to_convert, crypto_function) => {
  let new_object = new Object();

  Object.keys(object_to_convert).map((value) => {
    if (Array.isArray(object_to_convert[value]))
      new_object[value] = array_crypto(object_to_convert[value], crypto_function);
    if (
      typeof object_to_convert[value] === "object" &&
      !(object_to_convert[value] instanceof Date) &&
      !Array.isArray(object_to_convert[value])
    )
      new_object[value] = object_crypto(object_to_convert[value], crypto_function);
    else if (object_to_convert[value] instanceof Date) new_object[value] = object_to_convert[value];
    else new_object[value] = crypto_function(object_to_convert[value].toString());
  });

  return new_object;
};

const array_crypto = (array_to_convert, crypto_function) => {
  let new_array = new Array();
  array_to_convert.forEach((value) => {
    if (Array.isArray(value)) new_array.push(array_crypto(value, crypto_function));
    else if (typeof value === "object" && !(value instanceof Date) && !Array.isArray(value))
      new_array.push(object_crypto(value, crypto_function));
    else if (value instanceof Date) new_array.push(value);
    else new_array.push(crypto_function(value.toString()));
  });
  return new_array;
};

const string_crypto = (string_to_convert, crypto_function) => {
  return crypto_function(string_to_convert.toString());
};

export const Encryption = (encryption_value) => {
  const encrypt_item = (val) => {
    return CryptoJS.Rabbit.encrypt(val, process.env.CRYPTO_KEY).toString();
  };
  if (typeof encryption_value === "object" && !(encryption_value instanceof Date) && !Array.isArray(encryption_value))
    return object_crypto(encryption_value, encrypt_item);
  else if (Array.isArray(encryption_value)) return array_crypto(encryption_value, encrypt_item);
  else if (!(encryption_value instanceof Date)) return string_crypto(encryption_value, encrypt_item);
  else return encryption_value;
};

export const Decryption = (decryption_value) => {
  const decrypt_item = (val) => {
    return is_custom(CryptoJS.Rabbit.decrypt(val, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8));
  };
  if (typeof decryption_value === "object" && !(decryption_value instanceof Date) && !Array.isArray(decryption_value))
    return object_crypto(decryption_value, decrypt_item);
  else if (Array.isArray(decryption_value)) return array_crypto(decryption_value, decrypt_item);
  else if (!(decryption_value instanceof Date)) return string_crypto(decryption_value, decrypt_item);
  else return decryption_value;
};
