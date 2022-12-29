//
import express from "express";
import generate from "../../functions/generate_code/generator.js";
import { variable } from "../../variables/auth-phone.variable.js";
import { config } from "dotenv";
//Deafult

//
import { body as mock_body } from "../../../mock/phone.mock.js";
//Not important

//
import { send_message } from "../../functions/sms/sms.js";
//Sms api

config();
const router = express.Router();

router.post("/phone", async (req, res) => {
  /////////////////////////////////////////////////////////////////
  //Here is creating variable with parameters

  if (process.env.NODE_ENV !== "test") {
    variable.push({
      ...req.body,
      code: generate().toString(),
    });
  } else {
    variable.push({
      ...mock_body,
      code: generate().toString(),
    });
  }

  /////////////////////////////////////////////////////////////////
  //Here is message function

  if (process.env.NODE_ENV === "test") {
    //todo Here is a send function but i didn't have a
    //todo callback from sms api i need to check this with any balance
    // res.send(send_message(variable.slice(-1).phone, `code ${variable.slice(-1).code}`));
  } else {
    res.status(200);
    res.send(JSON.stringify(variable.slice(-1)));
  }

  /////////////////////////////////////////////////////////////////
});

export default router;
