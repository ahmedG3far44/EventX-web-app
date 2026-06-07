import { Router } from "express";
import {
  login,
  logout,
  register,
  createDefaultAdmin,
  seedUsers,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/default-admin", createDefaultAdmin);
router.post("/seed", seedUsers);
router.post("/logout", logout);

export default router;
