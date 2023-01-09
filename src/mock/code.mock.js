import { variable } from "../utils/variables/auth-phone.variable.js";

export const correctAuth = variable.slice(-1);

export const incorrectAuth = {
  ...variable.slice(-1).phone,
  ...variable.slice(-1).IMEI,
  code: 0800,
};
