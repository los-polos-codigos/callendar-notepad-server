import { databaseErr } from "../functions/server/server.js";

export const checkDatabase = function (req, res, next) {
  if (databaseErr) {
    res.status(408);
    res.send("Auth.04");
  } else {
    next();
  }
};
