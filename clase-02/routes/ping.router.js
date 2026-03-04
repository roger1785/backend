import { Router } from "express";

const router = Router();

router.get("ping", async (req, res) => {
  res.json({ message: "pong" });
});

export default router;
