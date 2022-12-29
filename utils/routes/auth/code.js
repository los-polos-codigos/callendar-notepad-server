//
import express from "express";
import { config } from "dotenv";
import { Decryption } from "../../functions/crypto/crypto.js";
//Default

//
import { variable } from "../../variables/auth-phone.variable.js";
import fail from "../../variables/auth-code.variable.js";
//Variables

//
import { user_verification } from "../../models/user_verification.model.js";
//Models
config();
const router = express.Router();

router.post("/code", async (req, res) => {
  const delay = 1000 * 60 * 0.5;
  const blockRequest = setTimeout(() => {
    fail.clear();
  }, delay);

  if (fail.view() < 3) {
    /////////////////////////////////////////////////////////////////
    //Here is correct valid authorization continuation

    if (JSON.stringify(variable.slice(-1)[0]) === JSON.stringify(req.body)) {
      const verification = await user_verification.find({ ...variable.slice(-1).phone });

      if (verification.length === 0) {
        const user = { userId: verification._id, isUserArleadyExist: false };
        res.status(201);
        res.send(user);
      } else {
        const user = { userId: verification._id, isUserArleadyExist: true };
        res.status(200);
        res.send(user);
      }
    }
    /////////////////////////////////////////////////////////////////
    //Here is incorrect valid authorization continuation
    else {
      res.status(401);
      res.send("Incorrect authorization code");
      fail.increment();
      if (fail.view() === 3) blockRequest;
    }
    /////////////////////////////////////////////////////////////////
  } else {
    let timeLeft;

    if (Math.ceil((blockRequest._idleTimeout - blockRequest._idleStart) / 1000) <= 0) timeLeft = 0;
    else timeLeft = Math.ceil((blockRequest._idleTimeout - blockRequest._idleStart) / 1000);

    res.status(423);
    res.send(`Too many attempts, please try again in ${timeLeft} s`);
  }
});

export default router;
