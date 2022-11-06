import CryptoJS from "crypto-js";
import { config } from "dotenv";

config();

const object_crypto = (obj, type) => {
  let new_object = new Object();
  Object.keys(obj).map((val) => {
    if (typeof obj[val] !== "object" && !(obj[val] instanceof Date)) new_object[val] = decrypt_value(obj[val]);

    if (typeof obj[val] === "object" && !(obj[val] instanceof Date)) new_object[val] = object_decryption(obj[val]);

    if (obj[val] instanceof Date) new_object[val] = obj[val];
  });

  return new_object;
};
const array_crypto = (arr, type) => {
  let new_array = new Array();

  arr.forEach((element) => {
    if (typeof element === "object") new_array.push(object_crypto(element, type));

    if (Array.isArray(element)) new_array.push(array_decryption(element));

    if (typeof element === "string") new_array.push(type(element));
  });

  return new_array;
};

export const Encryption = (value) => {
  const encrypt_value = (val) => {
    return CryptoJS.Rabbit.encrypt(val, process.env.CRYPTO_KEY).toString();
  };

  // const object_encryption = (obj) => {
  //   let new_object = new Object();
  //   Object.keys(obj).map((val) => {
  //     if (typeof obj[val] !== "object" && !(obj[val] instanceof Date))
  //       new_object[val] = encrypt_value(obj[val].toString());

  //     if (typeof obj[val] === "object" && !(obj[val] instanceof Date)) new_object[val] = object_encryption(obj[val]);

  //     if (obj[val] instanceof Date) new_object[val] = obj[val];
  //   });

  //   return new_object;
  // };

  // const array_encryption = (arr) => {
  //   let new_array = new Array();

  //   arr.forEach((element) => {
  //     if (typeof element === "object") new_array.push(object_encryption(element));

  //     if (Array.isArray(element)) new_array.push(array_encryption(element));

  //     if (typeof element === "string" || typeof element === "number") new_array.push(encrypt_value(element.toString()));
  //   });

  //   return new_array;
  // };

  if (typeof value === "object" && !(value instanceof Date)) {
    return object_encryption(value);
  } else if (Array.isArray(value)) {
    return array_crypto(value, encrypt_value());
  }
  if (!(value instanceof Date)) return encrypt_value(value.toString());
  else return value;
};

export const Decryption = (value) => {
  const decrypt_value = (val) => {
    return CryptoJS.Rabbit.decrypt(val, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
  };
  const object_decryption = (obj) => {
    let new_object = new Object();
    Object.keys(obj).map((val) => {
      if (typeof obj[val] !== "object" && !(obj[val] instanceof Date)) new_object[val] = decrypt_value(obj[val]);

      if (typeof obj[val] === "object" && !(obj[val] instanceof Date)) new_object[val] = object_decryption(obj[val]);

      if (obj[val] instanceof Date) new_object[val] = obj[val];
    });

    return new_object;
  };
  const array_decryption = (arr) => {
    let new_array = new Array();

    arr.forEach((element) => {
      if (typeof element === "object") new_array.push(object_decryption(element));

      if (Array.isArray(element)) new_array.push(array_decryption(element));

      if (typeof element === "string") new_array.push(decrypt_value(element));
    });

    return new_array;
  };

  if (typeof value === "object") return object_decryption(value);
  else if (Array.isArray(value)) return array_decryption(value);

  return decrypt_value(value);
};
