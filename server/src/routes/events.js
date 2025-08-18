import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controllers.js";


const router = Router();

router.use("/login", login);
router.use("/register", register);
router.use("/logout", logout);

export default router;
