import { Router } from "express";
import { getUsersList } from "../controllers/users.controllers.js";



const router = Router();

router.get("/", getUsersList);


export default router;
