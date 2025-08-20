import { Router } from "express";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const router = Router();

router.post("/", verifyAccessToken, async (req, res) => {
  const user = req.user;
  
  console.log(user._id);
  console.log(req.body);
});

export default router;
