//
import express from "express";
import generate from "../../functions/generate_code/generator.js";
import { variable, fail } from "../../variables/auth-phone.variable.js";
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

let blockRequest = null;
const PhoneValidationPattern = /^[\+]\d{1,3}\d{9}$/g;
const PhoneValidationLetters = /[A-Za-z]/g;

router.post("/phone", async (req, res) => {
  const delay = 1000 * 60 * 15;
  const user = { phone: req.body.phone, deviceId: req.body.deviceId };

  if (typeof user.phone !== "undefined" && typeof user.deviceId !== "undefined") {
    if (PhoneValidationPattern.test(user.phone)) {
      if (fail.view(user) === 4) blockRequest = Date.now() + delay;

      if (fail.view(user) < 5) {
        //Here is creating variable with parameters
        if (process.env.NODE_ENV !== "test") {
          variable.push({
            ...req.body,
            code: generate().toString(),
            timeout: Date.now() + 1000 * 60 * 15,
          });
        } else {
          variable.push({
            ...mock_body,
            code: generate().toString(),
            timeout: Date.now() + 1000 * 60 * 15,
          });
        } //Przeczytaj todo w pliku code.js

        /////////////////////////////////////////////////////////////////
        //Here is message function
        //później zmienić na !==
        if (process.env.NODE_ENV === "test") {
          //FIXME:  Here is a send function but i didn't have a
          //FIXME:  callback from sms api i need to check this with any balance

          //send_message(variable.slice(-1).phone, `code ${variable.slice(-1).code}`)
          res.status(200);
          res.end();
        } else {
          console.log(variable.slice(-1));
          res.status(200);
          res.end();
        }
        fail.increment(user);
        /////////////////////////////////////////////////////////////////
      } else {
        let timeLeft = blockRequest - Date.now();
        if (timeLeft <= 0) {
          timeLeft = 0;
          blockRequest = null;
          fail.clear(user);
        }
        res.status(423);
        res.send(JSON.parse(JSON.stringify({ timeLeft: Math.round(timeLeft / 1000) })));
      }
    } else {
      res.status(404);
      if (!user.phone.includes("+")) {
        res.send({ Comment: "Does not occur +" });
        return;
      }
      if (user.phone.length > 13) {
        res.send({ Comment: "Is too long" });
        return;
      }
      if (user.phone.length < 11) {
        res.send({ Comment: "Is too short" });
        return;
      }
      if (PhoneValidationLetters.test(user.phone)) {
        res.send({ Comment: "Contains a letter" });
        return;
      }
      res.end();
    }
  } else {
    res.status(404);
    res.send("Auth.05");
    res.end();
  }
});

export default router;
