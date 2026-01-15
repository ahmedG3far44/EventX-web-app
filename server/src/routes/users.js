import { Router } from "express";
import { getUsersList } from "../controllers/users.controllers.js";

import verifyIsAdmin from "../middlewares/verifyIsAdmin.js";



const router = Router();

router.get("/", verifyIsAdmin ,getUsersList);


export default router;
