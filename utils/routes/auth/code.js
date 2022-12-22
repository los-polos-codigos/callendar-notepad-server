import express from "express";

const router = express.Router();

router.post("/code", async (req, res) => {
  res.send("lol");
});

export default router;
