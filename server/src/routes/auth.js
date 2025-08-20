import { Router } from "express";
import {
  createDefaultAdmin,
  login,
  logout,
  register,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/default-admin", createDefaultAdmin);
router.post("/logout", logout);

export default router;
