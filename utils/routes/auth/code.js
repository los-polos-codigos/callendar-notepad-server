//
import express from "express";
import { config } from "dotenv";
//Default

//
import { variable } from "../../variables/auth-phone.variable.js";
import fail from "../../variables/auth-code.variable.js";
//Variables

//
import { user_verification as database } from "../../models/user_verification.model.js";
import { accessToken, refreshToken } from "../token/generate.token.js";
import { databaseErr } from "../../functions/server/server.js";
//Models
config();
const router = express.Router();

router.post("/code", async (req, res) => {
  if (databaseErr) {
    res.status(408);
    res.send("Auth.04");
  } else {
    if (fail.view({ phone: req.body.phone, deviceId: req.body.deviceId }) < 3) {
      const user_code_verification = variable.some(
        (v) => v.phone === req.body.phone && v.deviceId === req.body.deviceId && v.code === req.body.code
      );

      if (user_code_verification === true) {
        const docs = await database.find({ phone: req.body.phone });

        if (Array.isArray(docs) && !docs.length) {
          const create = await database.create({ phone: req.body.phone });
          create instanceof database;

          res.status(200);
          res.send(
            JSON.parse(
              JSON.stringify({
                isUserAlreadyExist: false,
                accessToken: accessToken(req.body.phone),
                refreshToken: refreshToken(req.body.phone),
              })
            )
          );
          res.end();
        } else {
          if (typeof docs[0].name !== "undefined" && typeof docs[0].surrname !== "undefined") {
            res.status(200);
            res.send(
              JSON.parse(
                JSON.stringify({
                  isUserAlreadyExist: true,
                  accessToken: accessToken(req.body.phone),
                  refreshToken: refreshToken(req.body.phone),
                })
              )
            );
            res.end();
          } else {
            res.status(200);
            res.send(
              JSON.parse(
                JSON.stringify({
                  isUserAlreadyExist: false,
                  accessToken: accessToken(req.body.phone),
                  refreshToken: refreshToken(req.body.phone),
                })
              )
            );
            res.end();
          }
        }
        //Here i was checking variable and i delete all userId (phone number) objects
        variable.forEach((e, i) => {
          if (e.phone === req.body.phone && e.deviceId === req.body.deviceId) variable.splice(i, 1);
        });
      } else {
        fail.increment({ phone: req.body.phone, deviceId: req.body.deviceId });
        res.status(401);
        res.send(JSON.parse(JSON.stringify({ Comment: "Auth.03" })));
      }
    } else {
      res.status(429);
      res.send(JSON.parse(JSON.stringify({ Comment: "Auth.02" })));
      fail.clear({ phone: req.body.phone, deviceId: req.body.deviceId });
    }
    //Here i was checkind create date and i deleting vairable
    variable.forEach((e, i) => {
      if (e.timeout - Date.now() <= 0) variable.splice(i, 1);
    });
  }
});

export default router;
