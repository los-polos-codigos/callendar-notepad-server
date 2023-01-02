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
  if (fail.view({ phone: req.body.phone, IMEI: req.body.IMEI }) < 3) {
    const user_code_verification = variable.some((v) => {
      if (v.phone === req.body.phone && v.IMEI === req.body.IMEI && v.code === req.body.code) {
        return true;
      } else {
        return false;
      }
    });

    if (user_code_verification === true) {
      res.status(200);
      res.end();
    } else {
      fail.increment({ phone: req.body.phone, IMEI: req.body.IMEI });
      res.status(401);
      res.send(JSON.parse(JSON.stringify({ Comment: "Auth.03" })));
    }

    /////////////////////////////////////////////////////////////////
    //Here is correct valid authorization continuation

    // if (JSON.stringify(correctUserData[0]) === JSON.stringify(req.body)) {
    //   console.log(correctUserData);
    //   const verification = await user_verification.find({ ...correctUserData.phone });
    //   // , (err, user) => {
    //   //   if (err) throw err;
    //   //   else {
    //   //     console.log(user);
    //   //     res.send(user);
    //   //   }
    //   // }); //TODO tutaj skończyłem rozpierdol projektu
    //   if (verification.length === 0) {
    //     const user = { isUserArleadyExist: false };
    //     res.status(201);
    //     res.send(user);
    //   } else {
    //     console.log(verification);
    //     const user = { phone: verification[0].phone, isUserArleadyExist: true };
    //     res.status(200);
    //     res.send(user);
    //   }
    // }
    // /////////////////////////////////////////////////////////////////
    // //Here is incorrect valid authorization continuation
    // else {
    //   res.status(401);
    //   res.send("Incorrect authorization code");
    //   fail.increment();
    // }
    /////////////////////////////////////////////////////////////////
  } else {
    res.status(429);
    res.send(JSON.parse(JSON.stringify({ Comment: "Auth.02" })));
    fail.clear({ phone: req.body.phone, IMEI: req.body.IMEI });
  }
  //TODO muszę dodać tutaj usówanie użytkowników z
  //TODO tablicy variable którym przekroczył się czas trwania kodu
  //TODO lub użytkownik dokonał poprawnej weryfikacji
});

export default router;
